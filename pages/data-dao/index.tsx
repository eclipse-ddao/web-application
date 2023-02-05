import React, { useState } from "react";
import MainContainer from "../../components/common/MainContainer";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import Image from "next/image";
import { useCreateDataDao } from "../../hooks/mutations/useCreateDataDao";
import { useDaoInfo } from "../../hooks/queries/useDaoInfo";
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
  const [selectedDaoAddress, setSelectedDaoAddress] = useSelectedDaoAddress();
  const router = useRouter();

  const { data: daos, isLoading: daoLoading } = useDaoInfo(selectedDaoAddress);

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
    <MainContainer
      heading="Create your Own Data DAO"
      active="data-dao"
      showMenu={false}>
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
            {isSmartContractLoading || isCreateDataDaoLoading
              ? "Creating.."
              : "Create"}
          </Button>
        </div>

        {(isCreateDataDaoLoading || isSmartContractLoading) && (
          <div className="self-end text-sm font-semibold text-grey-400">
            This will take a while. Sit back and relax
          </div>
        )}
      </div>
      {/* {JSON.stringify(daos)} */}
      <div className="fixed w-56 h-56 -bottom-12 right-2">
        <Image src={"/images/cube.png"} alt="Cube" width="1352" height="1076" />
      </div>
    </MainContainer>
  );
};

export default DataDao;
