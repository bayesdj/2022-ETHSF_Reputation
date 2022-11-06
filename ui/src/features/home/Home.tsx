import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-2 gap-10">
        <NavLink to="/signup/creator">
          <Box
            sx={{
              width: 300,
              height: 300,
              display: "flex",
              alignItems: "center",
              color: "White",
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <div className="w-full text-center text-lg">Sign up as creator</div>
          </Box>
        </NavLink>
        <NavLink to="/signup/viewer">
          <Box
            sx={{
              width: 300,
              height: 300,
              display: "flex",
              alignItems: "center",
              color: "White",
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <div className="w-full text-center text-lg">Sign up as viewer</div>
          </Box>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
