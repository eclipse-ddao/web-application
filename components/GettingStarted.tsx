/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Button from "./common/Button";
import { useRouter } from "next/router";

import Image from "next/image";
import { useConnectWallet } from "../hooks/mutations/useConnectWallet";
import { useWalletAddress } from "../hooks/state/useAppState";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
// import {
//   ConnectButton,
//   useAccountModal,
//   useChainModal,
//   useConnectModal,
//   useAddRecentTransaction,
// } from "@rainbow-me/rainbowkit";

function GettingStarted() {
  // const data = useAddRecentTransaction();
  // const { openAccountModal } = useAccountModal();
  // const { openChainModal } = useChainModal();
  // const { openConnectModal } = useConnectModal();
  const { mutate: connectWalletMutation, isLoading } = useConnectWallet();
  const [walletAddress, setWalletAddress] = useWalletAddress();
  const router = useRouter();
  // console.log("___DATA", data);

  const handleConnectWallet = () => {
    connectWalletMutation(
      {},
      {
        onSuccess(res) {
          setWalletAddress(res);
          toast.success("Successfully connected wallet");
          // router.push("/home");
        },
        onError(err) {
          toast.error("Some error connecting wallet");
        },
      }
    );
  };

  useEffect(() => {
    if (walletAddress) {
      router.push("/home");
    }
  }, [walletAddress, router]);

  return (
    <div className="relative flex flex-col items-center w-screen h-screen font-poppins bg-gradient-to-tr from-brand-800 to-brand-600 ">
      <div className="fixed w-screen h-screen bg-gradient-to-bl from-black/70 to-black/0" />
      <div className="fixed bottom-96 right-24 animate-spin-slow">
        <Image
          src={"/images/shapeone.png"}
          alt="Sphere"
          width="161"
          height="161"
        />
      </div>
      <div className="fixed bottom-64 right-10 animate-spin-slow">
        <Image
          src={"/images/shapetwo.png"}
          alt="Sphere"
          width="161"
          height="161"
        />
      </div>
      <div className="fixed bottom-24 right-20 animate-spin-slow">
        <Image
          src={"/images/shapethree.png"}
          alt="Sphere"
          width="161"
          height="161"
        />
      </div>
      <div className="flex flex-col items-center w-full min-h-screen bg-fixed bg-cover bg-paper">
        <Head>
          <title>Eclipse</title>
        </Head>
        <div className="relative w-full h-full ">
          {/* Navbar */}
          <div className="flex items-center justify-between p-4 mt-10 md:px-24">
            <div
              className="cursor-pointer w-28"
              onClick={() => router.push("/")}>
              <Image src="/eclipse.png" width="384" height="165" alt="logo" />
            </div>
            <div>
              <Button onClick={() => handleConnectWallet()}>
                Connect Wallet
              </Button>
              {/* <Button onClick={() => openConnectModal?.()}>
                Connect Wallet
              </Button> */}
              {/* <ConnectButton /> */}
            </div>
          </div>
          {/* Main */}
          <div className="w-full p-4 md:px-24">
            <div className="grid max-w-5xl grid-cols-2 gap-8">
              {[1, 2, 3].map((no) => {
                return (
                  <div
                    key={no}
                    className="px-24 py-20 border rounded-lg border-brand-600/40 bg-gradient-to-tr from-white/0 via-white/20 to-white/40">
                    <div className="text-white lowercase">
                      Organize your files with your team in decentralised
                      fashion
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="z-20 flex flex-col w-full uppercase ">
              <div className="flex flex-col w-full gap-5">
                <span className="w-4/5 mt-20 font-bold leading-none text-transparent uppercase text-7xl bg-gradient-to-bl from-brand-600 to-white font-raleway bg-clip-text drop-shadow-lg">
                  getting started
                  <br /> with eclipse
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GettingStarted;
