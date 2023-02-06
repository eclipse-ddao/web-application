import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSingleUserInfo } from "../../hooks/queries/useSingleUserInfo";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";

const LeftColorBar = () => {
  const router = useRouter();
  const [walletAdderss] = useWalletAddress();
  const [selectedDaoAddress, setSelectedDaoAddress] = useSelectedDaoAddress();
  const { data: singleUserInfo } = useSingleUserInfo(walletAdderss);

  const handleAddDao = () => {
    setSelectedDaoAddress("");
    router.push("/data-dao");
  };

  return (
    <div className="relative flex flex-col h-full gap-4 px-4 py-8 overflow-x-hidden bg-brand-100">
      <div className="absolute top-10 -left-10 mix-blend-hard-light">
        <Image
          src={"/images/sphere.webp"}
          alt="Sphere"
          width="60"
          height="60"
        />
      </div>
      <div className="absolute top-96 -left-12 mix-blend-hard-light">
        <Image
          src={"/images/sphere.webp"}
          alt="Sphere"
          width="70"
          height="70"
        />
      </div>
      <div className="absolute bottom-24 -right-10 mix-blend-hard-light">
        <Image
          src={"/images/sphere.webp"}
          alt="Sphere"
          width="80"
          height="80"
        />
      </div>
      {singleUserInfo?.daos?.map((dao) => {
        const active = selectedDaoAddress === dao.contract_address;
        return (
          <div
            onClick={() => {
              setSelectedDaoAddress(dao.contract_address);
              router.push("/home");
            }}
            key={dao.name}
            className={`cursor-pointer relative w-12 h-12 overflow-hidden rounded-full border-4 ${
              active ? "border-[#448FFF]" : "border-[#BCD7FF]"
            }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dao.avatar_url}
              alt="Dao Avatar"
              className="object-cover"
            />
          </div>
        );
      })}
      <div
        className="relative flex items-center justify-center w-12 h-12 bg-teal-500 rounded-full cursor-pointer "
        onClick={() => handleAddDao()}>
        <span className="absolute text-3xl font-thin text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          +
        </span>
      </div>
    </div>
  );
};

export default LeftColorBar;
