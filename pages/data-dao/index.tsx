import React, { useState } from "react";
import MainContainer from "../../components/common/MainContainer";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import Image from "next/image";
import { useCreateDataDao } from "../../hooks/mutations/useCreateDataDao";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";
import { useDataDaoSmartContract } from "../../hooks/mutations/useDataDaoSmartContract";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const initialValue = {
  name: "",
  description: "",
  avatar_url: "",
  created_by: "",
  contract_address: "",
};

const DataDao = () => {
  const { mutate: createDataDaoMutation, isLoading: isCreateDataDaoLoading } =
    useCreateDataDao();
  const {
    mutate: dataDaoSmartContractMutation,
    isLoading: isSmartContractLoading,
  } = useDataDaoSmartContract();

  const [, setWalletAddress] = useWalletAddress();
  const [, setSelectedDaoAddress] = useSelectedDaoAddress();
  const router = useRouter();

  const [data, setData] = useState(initialValue);
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    dataDaoSmartContractMutation(
      {},
      {
        onSuccess(res) {
          setWalletAddress(res.walletAddress);
          const body = {
            ...data,
            created_by: res.walletAddress,
            contract_address: res.contractAddress,
          };
          createDataDaoMutation(body, {
            onSuccess(result) {
              console.log(result);
              setData(initialValue);
              toast.success("Successfully added dao");
              queryClient.invalidateQueries(["user", res.walletAddress]);
              setSelectedDaoAddress(res.contractAddress);
              router.push("/home");
            },
            onError(err) {
              toast.error("Some error while creating!");
            },
          });
        },
        onError(err) {
          toast.error("Some error while creating");
        },
      }
    );
  };

  const handleChange = (value: string, name: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    // <MainContainer
    //   heading="Create your Own Data DAO"
    //   active="data-dao"
    //   showMenu={false}>
    <>
      <div className="flex flex-col max-w-2xl gap-8 p-10 mx-auto border border-grey-200 rounded-xl ">
        <div className="">
          <Input
            label="Name your Data DAO"
            value={data.name}
            onChange={(e) => handleChange(e.target.value, "name")}
            placeholder="Design DAO Asus"
          />
        </div>
        <div className="flex flex-col gap-2">
          <TextArea
            label="Description"
            value={data.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            placeholder="This is my design DAO used for managing files within our design team. please note only members who have access to the design data dao can add files here. contact @missyelliot for help regarding setting up the dao"
          />
          <p className="text-xs text-grey-400">
            We recommend descriptions between 50 and 160 characters.
          </p>
        </div>
        <div className="">
          <Input
            label="Avatar Url"
            value={data.avatar_url}
            onChange={(e) => handleChange(e.target.value, "avatar_url")}
            placeholder="Add your avatar url"
          />
        </div>
        <Alert
          type="info"
          label="Adding members"
          subLabel="After having created the data dao for your team you can add members in it from
the team section in your data dao."
          showLearnMore={true}
        />
        <div className="flex justify-between ">
          <Button variant="secondary" className="text-black">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isCreateDataDaoLoading || isSmartContractLoading}>
            {isSmartContractLoading || isCreateDataDaoLoading ? (
              <div className="flex items-center gap-2">
                Creating{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 animate-spin">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                  />
                </svg>
              </div>
            ) : (
              "Create"
            )}
          </Button>
        </div>

        {(isCreateDataDaoLoading || isSmartContractLoading) && (
          <div className="self-end text-sm font-semibold text-grey-400">
            This will take a while. Sit back and relax
          </div>
        )}
      </div>
      <div className="fixed w-56 h-56 -bottom-12 right-2">
        <Image src={"/images/cube.png"} alt="Cube" width="1352" height="1076" />
      </div>
    </>
    // </MainContainer>
  );
};

export default DataDao;
