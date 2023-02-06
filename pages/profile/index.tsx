import Image from "next/image";
import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import MainContainer from "../../components/common/MainContainer";
import { useDaoInfo } from "../../hooks/queries/useDaoInfo";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";
import { LH_KEY } from "../../utils/constants";

const Profile = () => {
  const [walletAddress] = useWalletAddress();
  const [selectedDaoAddress] = useSelectedDaoAddress();

  const { data: dao } = useDaoInfo(selectedDaoAddress);

  return (
    <MainContainer heading="Profile" active={"profile"}>
      <div className="flex flex-col max-w-2xl gap-8 p-10 mx-auto border border-grey-200 rounded-xl ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dao?.avatar_url}
          alt="Dao Avatar"
          width={100}
          height={100}
          className="overflow-hidden rounded-full"
        />
        <div className="">
          <Input label="Name" value={dao?.name} placeholder="Design DAO Asus" />
        </div>
        <div className="">
          <Input
            label="Your Wallet Address"
            value={walletAddress}
            placeholder="Design DAO Asus"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label="DAO Contract Address"
            value={selectedDaoAddress}
            placeholder="Design DAO Asus"
          />
        </div>
        <div className="">
          <Input
            label="Your Lighthouse API Key"
            value={LH_KEY}
            placeholder=""
          />
        </div>
        <div className="flex justify-end">
          <Button className="self-end">Save</Button>
        </div>
      </div>
      <div className="fixed w-56 h-56 -bottom-12 right-96">
        <Image src={"/images/cube.png"} alt="Cube" width="1352" height="1076" />
      </div>
    </MainContainer>
  );
};

export default Profile;
