import { auth, loaders, resolver } from "@iden3/js-iden3-auth";
import cors from "cors";
import express from "express";
import http from "http";
import getRawBody from "raw-body";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port = 8080;

app.use(cors());

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

app.get("/api/sign-in", (req, res) => {
  console.log("get Auth Request");
  GetAuthRequest(req, res);
});

app.post("/api/callback", (req, res) => {
  console.log("callback");
  Callback(req, res);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log("server running on port 8080");
});

// GetQR returns auth request
async function GetAuthRequest(req, res) {
  // Audience is verifier id
  const hostUrl = "https://f1a5-186-154-213-155.ngrok.io";
  const sessionId = 1;
  const callbackURL = "/api/callback";
  const audience = "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ";

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

  console.log(uri);
  // Generate request for basic authentication
  const request = auth.createAuthorizationRequestWithMessage(
    "test flow",
    "message to sign",
    audience,
    uri
  );

  request.id = "287916c6-49b8-4033-99b8-344ad0a34554";
  request.thid = "287916c6-49b8-4033-99b8-344ad0a34554";

  // Add request for a specific proof
  const proofRequest = {
    id: 1,
    circuit_id: "credentialAtomicQuerySig",
    rules: {
      query: {
        allowedIssuers: ["*"],
        schema: {
          type: "SoftwareEngineer",
          url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/40280143-4a67-4064-a94d-91317583f953.json-ld",
        },
        req: { isSoftwareEngineer: { $eq: 1 } },
      },
    },
  };

  const scope = request.body.scope ?? [];
  request.body.scope = [...scope, proofRequest];

  // Store auth request in map associated with session ID
  requestMap.set(`${sessionId}`, request);

  return res.status(200).set("Content-Type", "application/json").send(request);
}

// Callback verifies the proof after sign-in callbacks
async function Callback(req, res) {
  // Get session ID from request
  const sessionId = req.query.sessionId;

  // get JWZ token params from the post request
  const raw = await getRawBody(req);
  const tokenStr = raw.toString().trim();

  // fetch authRequest from sessionID
  const authRequest = requestMap.get(`${sessionId}`);

  // Locate the directory that contains circuit's verification keys
  const verificationKeyloader = new loaders.FSKeyLoader("./keys");
  const sLoader = new loaders.UniversalSchemaLoader("ipfs.io");

  // Add Polygon RPC node endpoint - needed to read on-chain state and identity state contract address
  const ethStateResolver = new resolver.EthStateResolver(
    "https://polygon-mumbai.g.alchemy.com/v2/G0gNWcYpU1gC38zNVkDFIlWhrhVXFcc0",
    "0x46Fd04eEa588a3EA7e9F055dd691C688c4148ab3"
  );

  // EXECUTE VERIFICATION
  const verifier = new auth.Verifier(
    verificationKeyloader,
    sLoader,
    ethStateResolver
  );

  let authResponse;

  try {
    authResponse = await verifier.fullVerify(tokenStr, authRequest);
    io.emit("proven", { proof: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

  return res
    .status(200)
    .set("Content-Type", "application/json")
    .send("user with ID: " + authResponse.from + " Succesfully authenticated");
}
