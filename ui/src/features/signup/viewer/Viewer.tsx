import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

enum Stage {
  STEP1,
  STEP2,
  STEP3,
}

const Viewer = () => {
  const [step, setStep] = useState<Stage>(Stage.STEP1);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setStep(Stage.STEP2);
    }
  }, [address]);

  useEffect(() => {
    if (step === Stage.STEP2) {
      setTimeout(() => {
        setStep(Stage.STEP3);
      }, 2000);
    }
  }, [step]);

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      {step === Stage.STEP1 && (
        <div>
          <h1 className="text-3xl pb-10">Finally lets connect your wallet</h1>
          <ConnectButton />
        </div>
      )}

      {step === Stage.STEP2 && (
        <div>
          <h1 className="text-3xl pb-10">Creating your lens profile.....</h1>
        </div>
      )}

      {step === Stage.STEP3 && (
        <div>
          <h1 className="text-3xl pb-10">Welcome 0x11</h1>
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

export default Viewer;
