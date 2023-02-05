import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWalletAddress } from "../../hooks/state/useAppState";
import Button from "./Button";

const Header = () => {
  const [walletAddress, setWalletAddress] = useWalletAddress();
  const router = useRouter();

  const setup = async () => {
    try {
      const ethereum = (window as any).ethereum;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      new ethers.providers.Web3Provider(ethereum);
      const walletAddress = accounts[0];
      setWalletAddress(walletAddress);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-between w-full gap-2 px-2 py-6 lg:px-20 ">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}>
        <div className="flex items-center">
          <Image src="/eclipse.png" width="384" height="165" alt="logo" />
        </div>
      </div>

      <div
        className="flex items-center gap-2 px-6 py-2 rounded-full cursor-pointer select-none "
        onClick={() => setup()}>
        <Button variant="tertiary">connect wallet</Button>
      </div>
    </div>
  );
};

export default Header;
