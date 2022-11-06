import { Button, TextField } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { VerificationResponse, WorldIDWidget } from "@worldcoin/id";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { QRCode } from "react-qr-svg";
import io from "socket.io-client";
import { useAccount } from "wagmi";

const socket = io("http://localhost:8080");

enum Stage {
  STEP1,
  STEP2,
  STEP3,
  STEP4,
  STEP5,
  STEP6,
}

const Creator = () => {
  const [step, setStep] = useState<Stage>(Stage.STEP1);
  const [qrCode, setQrCode] = useState();
  const [isWsConnected, setIsWsConnected] = useState(socket.connected);
  const [proven, setProven] = useState(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    socket.on("connect", () => {
      setIsWsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsWsConnected(false);
    });

    socket.on("proven", (data: any) => {
      if (data.proof) {
        disconnectSocket();
        setStep(Stage.STEP4);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      setStep(Stage.STEP5);
    }
  }, [address]);

  useEffect(() => {
    if (step === Stage.STEP5) {
      setTimeout(() => {
        setStep(Stage.STEP6);
      }, 2000);
    }
  }, [step]);

  const fetchQrCode = () => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/" + "api/sign-in")
        .then((r) =>
          Promise.all([Promise.resolve(r.headers.get("x-id")), r.json()])
        )
        .then(([id, data]) => {
          console.log(data);
          setQrCode(data);

          resolve(id);
        })
        .catch((err) => reject(err));
    });
  };

  const disconnectSocket = () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("proven");
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      {step === Stage.STEP1 && (
        <div>
          <h1 className="text-3xl pb-10">
            Please verify that you are a human...
          </h1>
          <WorldIDWidget
            actionId="wid_staging_dfcc5889882f235f773d0945e069ab96" // obtain this from developer.worldcoin.org
            signal="OnlyOnce"
            enableTelemetry
            onSuccess={async (verificationResponse: VerificationResponse) => {
              setStep(Stage.STEP2);
            }} // you'll actually want to pass the proof to the API or your smart contract
            onError={(error) => console.error(error)}
          />
        </div>
      )}

      {step === Stage.STEP2 && (
        <div>
          <h1 className="text-3xl pb-10">Thanks for verifying. What is your field(s) of expertise?</h1>
          <TextField
            fullWidth
            label="skill"
            id="fullWidth"
            sx={{ marginBottom: "25px" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              fetchQrCode().then(() => setStep(Stage.STEP3));
            }}
          >
            Click to verify credentials with Polygon ID...
          </Button>
        </div>
      )}

      {step === Stage.STEP3 && (
        <div>
          <h1 className="text-3xl pb-10">Verify with PolygonID...</h1>
          <ReactJson src={qrCode!} collapsed={true} />
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify(qrCode)}
          />
        </div>
      )}

      {step === Stage.STEP4 && (
        <div>
          <h1 className="text-3xl pb-10">Finally lets connect your wallet</h1>
          <ConnectButton />
        </div>
      )}

      {step === Stage.STEP5 && (
        <div>
          <h1 className="text-3xl pb-10">Creating your lens profile.....</h1>
        </div>
      )}

      {step === Stage.STEP6 && (
        <div>
          <h1 className="text-3xl pb-10">Welcome 0x58</h1>
          {[0, 1, 2].map((val, index) => (
            <Stack spacing={1} key={index}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="rounded" width={210} height={60} />
            </Stack>
          ))}
        </div>
      )}
    </div>
  );
};

export default Creator;
