import Image from "next/image";
import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import MainContainer from "../../components/common/MainContainer";
import { useDaoInfo } from "../../hooks/queries/useDaoInfo";
import { useSingleUserInfo } from "../../hooks/queries/useSingleUserInfo";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";
import { LH_KEY } from "../../utils/constants";

const Profile = () => {
  const [walletAddress, setWalletAddress] = useWalletAddress();
  const [selectedDaoAddress, setSelectedDaoAddress] = useSelectedDaoAddress();

  const { data: dao } = useDaoInfo(selectedDaoAddress);
  const { data: user } = useSingleUserInfo(walletAddress);
  console.log("__SINGLE USER", user);

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
          <Input
            label="Name"
            value={dao?.name}
            // onChange={(e) => handleChange(e.target.value, "name")}
            placeholder="Design DAO Asus"
          />
        </div>
        <div className="">
          <Input
            label="Your Wallet Address"
            value={walletAddress}
            // onChange={(e) => handleChange(e.target.value, "name")}
            placeholder="Design DAO Asus"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label="DAO Contract Address"
            value={selectedDaoAddress}
            // onChange={(e) => handleChange(e.target.value, "name")}
            placeholder="Design DAO Asus"
          />
        </div>
        <div className="">
          <Input
            label="Your Lighthouse API Key"
            value={LH_KEY}
            // onChange={(e) => handleChange(e.target.value, "avatar_url")}
            placeholder=""
          />
        </div>
        {/* <Alert
          type="info"
          label="Adding members"
          subLabel="After having created the data dao for your team you can add members in it from
the team section in your data dao."
          showLearnMore={true}
        /> */}
        <div className="flex justify-end">
          {/* <Button variant="secondary" className="text-black">
            Cancel
          </Button> */}
          <Button className="self-end">Save</Button>
        </div>
      </div>
      {/* {JSON.stringify(daos)} */}
      <div className="fixed w-56 h-56 -bottom-12 right-96">
        <Image src={"/images/cube.png"} alt="Cube" width="1352" height="1076" />
      </div>
    </MainContainer>
  );
};

export default Profile;
