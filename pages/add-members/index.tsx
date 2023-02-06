import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import MainContainer from "../../components/common/MainContainer";
import { useAddMember } from "../../hooks/mutations/useAddMember";
import { useAddMemberSmartContract } from "../../hooks/mutations/useAddMemberSmartContract";
import { useSelectedDaoAddress } from "../../hooks/state/useAppState";

const AddMembers = () => {
  const [selectedDaoAddress] = useSelectedDaoAddress();
  const {
    mutate: addMemberSmartContractMutation,
    isLoading: addMemberSmartContractLoading,
  } = useAddMemberSmartContract();
  const { mutate: addMemberMutation, isLoading: addMemberLoading } =
    useAddMember();

  const [newMemberAddress, setNewMemberAddress] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (!selectedDaoAddress) {
      toast("Please select a Data DAO");
      router.push("/data-dao");
    }
  }, [selectedDaoAddress, router]);

  const handleSubmit = () => {
    addMemberSmartContractMutation(
      { daoAddress: selectedDaoAddress, newMemberAddress },
      {
        onSuccess(res) {
          const body = {
            dao_contract_address: selectedDaoAddress,
            member_address: newMemberAddress,
          };
          addMemberMutation(body, {
            onSuccess(result) {
              console.log(result);
              toast.success("Member successfully added");
              queryClient.invalidateQueries(["dao", selectedDaoAddress]);
              setNewMemberAddress("");
            },
            onError(err) {
              toast.error("Some error while creating!");
            },
          });
        },
        onError(err) {
          console.log("ERROR", err);
          toast.error("Some error while creating");
        },
      }
    );
  };

  return (
    // <MainContainer heading="Add members" active={"add-members"}>
    <div className="flex flex-row justify-between max-w-2xl border rounded-lg">
      <div className="flex flex-col w-full gap-8 p-6">
        <div className="flex flex-col gap-2">
          <Input
            value={newMemberAddress}
            onChange={(e) => setNewMemberAddress(e.target.value)}
            placeholder="enter address"
            label="Member's address"
          />
        </div>
        <Alert
          label="Members added will have access to the files within this Data DAO"
          subLabel=""
          showLearnMore={false}
        />
        <div className="flex justify-between ">
          <Button
            variant="secondary"
            onClick={() => router.push("/home")}
            className="text-black">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={addMemberSmartContractLoading || addMemberLoading}>
            {addMemberSmartContractLoading || addMemberLoading ? (
              <div className="flex items-center gap-2">
                {"Adding "}
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
              "Add Member"
            )}
          </Button>
        </div>
        {(addMemberSmartContractLoading || addMemberLoading) && (
          <div className="self-end text-sm font-semibold text-grey-400">
            This will take a while. Sit back and relax
          </div>
        )}
      </div>
    </div>
    // </MainContainer>
  );
};

export default AddMembers;
