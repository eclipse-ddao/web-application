import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { selectSPSmartContract } from "../../endpoints/big-files";
import { useSelectProposal } from "../../hooks/mutations/useSelectProposal";
import { useSelectSPSmartContract } from "../../hooks/mutations/useSelectSPSmartContract";
import { useStorageProviderInfo } from "../../hooks/queries/useStorageProviderInfo";
import {
  useSelectedDaoAddress,
  useSelectedProposalId,
} from "../../hooks/state/useAppState";

const StorageProviderDetail = () => {
  const router = useRouter();
  const spAddress = router.query.address;
  const [selectedProposalId, setSelectedProposalId] = useSelectedProposalId();
  const { mutate, isLoading } = useSelectSPSmartContract();
  const { data: storageProviderInfo } = useStorageProviderInfo(spAddress);
  const [daoAddress] = useSelectedDaoAddress();
  const { mutate: selectProposalMutation, isLoading: selectProposalLoading } =
    useSelectProposal();

  const handleSubmit = () => {
    mutate(
      {
        daoAddress: daoAddress,
        spAddress: spAddress,
      },
      {
        onSuccess(result) {
          selectProposalMutation(
            { proposal_id: selectedProposalId },
            {
              onSuccess(result) {
                toast.success("Successfully selected the storage provider");
                setSelectedProposalId(0);
                router.back();
              },
              onError(err) {
                toast.error("Some error selecting storage provider");
              },
            }
          );
        },
        onError(err) {
          toast.error("Some error selecting storage provider");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8 p-4 ">
        <div className="flex items-center justify-between">
          <div
            className="font-semibold cursor-pointer text-brand-700 hover:text-brand-800 hover:underline"
            onClick={() => router.back()}
          >
            Go back
          </div>
          <Button onClick={handleSubmit}>Select</Button>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={storageProviderInfo?.avatar_url}
          alt="SP Avatar"
          width={100}
          height={100}
          className="overflow-hidden rounded-full"
        />
        <div className="flex flex-row gap-4">
          <Input
            label="Name"
            value={storageProviderInfo?.name}
            fullWidth
            disabled
          />
          <Input
            label="Contact Info"
            disabled
            fullWidth
            value={storageProviderInfo?.contact_info}
          />
        </div>
        <div>
          <Input
            label="Reputation Link"
            fullWidth
            value={storageProviderInfo?.reputation_link}
          />
        </div>
      </div>
    </div>
  );
};

export default StorageProviderDetail;
