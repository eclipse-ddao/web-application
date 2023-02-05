import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect } from "react";
import { useConnectWallet } from "../../hooks/mutations/useConnectWallet";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";
import LeftColorBar from "./LeftColorBar";
import LeftInfoBar from "./LeftInfoBar";
import RightBar from "./RightBar";

type HomeContainerProps = {
  children: ReactNode;
  heading: string;
  active: string;
  showMenu?: boolean;
};

const MainContainer: FC<HomeContainerProps> = ({
  children,
  heading,
  active,
  showMenu = true,
}) => {
  const router = useRouter();

  const [walletAddress, setWalletAddress] = useWalletAddress();
  const [selectedDao, setSelectedDao] = useSelectedDaoAddress();
  const { mutate: connectWalletMutation } = useConnectWallet();

  useEffect(() => {
    if (!walletAddress) {
      // router.push("/getting-started");
      connectWalletMutation(
        {},
        {
          onSuccess(data) {
            setWalletAddress(data);
          },
        }
      );
    }
  }, [walletAddress, router]);

  return (
    <div className="relative flex w-screen h-screen bg-fixed bg-white bg-cover font-poppins bg-paper">
      <LeftColorBar />
      <div className="flex-1">
        <div className="grid items-center grid-cols-12 gap-4 border-b border-grey-200">
          <div className="flex items-center col-span-3 gap-1 p-8 py-4">
            <div
              className="cursor-pointer w-28"
              onClick={() => router.push("/")}>
              <Image
                src="/eclipsedark.png"
                width="384"
                height="165"
                alt="logo"
              />
            </div>
          </div>
          <div className="flex justify-between w-full max-w-5xl col-span-9 px-2 font-semibold">
            {heading}
            <div className="flex items-center gap-2 cursor-default">
              <div className="font-semibold text-brand-700">
                {walletAddress.toString().slice(0, 5) +
                  "..." +
                  walletAddress.toString().slice(-5)}
              </div>
              <div
                onClick={() => {
                  setWalletAddress("");
                  router.push("/getting-started");
                }}
                className="pr-10 text-sm text-red-500 uppercase cursor-pointer hover:text-red-400 active:text-red-500 hover:underline hvoer:underline-offset-2">
                Disconnect
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {showMenu && <LeftInfoBar active={active} />}
          <div
            className={`relative w-full overflow-y-auto ${
              showMenu ? "max-w-5xl" : ""
            } py-8 overflow-auto ${showMenu ? "col-span-9" : "col-span-12"}`}>
            {children}
          </div>
        </div>
      </div>
      {showMenu && <RightBar />}
    </div>
  );
};

export default MainContainer;
