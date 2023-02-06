import { Dialog } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import MainContainer from "../../../components/common/MainContainer";
import StorageContainer from "../../../components/common/StorageContainer";
import TextArea from "../../../components/common/TextArea";
import { useAddBigFile } from "../../../hooks/mutations/useAddBigFile";
import { useProposeStroage } from "../../../hooks/mutations/useProposeStroage";
import { useBigFileInfo } from "../../../hooks/queries/useBigFileInfo";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../../hooks/state/useAppState";

const initialValue = {
  duration: 0,
  size_in_gb: 0,
  base_bounty: 0,
  file_type: 1, // DROPDOWN -> based on value 1- link 2- hardware delivery 3- filecoin cid
  name: "",
  description: "",
  dao_contract_address: "",
  uploaded_by: "",
  expiry: new Date(),
};

const BigFileDetail = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const bigFileId = router.query.id;
  const [selectedDaoAddress] = useSelectedDaoAddress();
  const [walletAddress] = useWalletAddress();

  const { data } = useBigFileInfo(bigFileId as string);
  const { mutate: proposeStorageMutation, isLoading: proposeStorageLoading } =
    useProposeStroage();

  const [isOpen, setIsOpen] = useState(false);
  const [requestedBounty, setRequestedBounty] = useState("");

  const fileType = () => {
    switch (data?.file_type) {
      case 1: {
        return "Link";
      }
      case 2: {
        return "Hardware Delievery";
      }
      case 3: {
        return "Filecoin CID";
      }
      default:
        return "";
    }
  };

  const handleSubmit = () => {
    proposeStorageMutation(
      {
        b_file_id: Number(bigFileId),
        requested_bounty: Number(requestedBounty),
        storage_provider_address: walletAddress,
      },
      {
        onSuccess(result) {
          toast.success("Successfully placed bid");
          setRequestedBounty("");
          setIsOpen(false);
          queryClient.invalidateQueries(["storage-provider", walletAddress]);
          queryClient.invalidateQueries(["big-file", bigFileId]);
        },
        onError(err) {
          toast.error("There was some error placing bid!");
        },
      }
    );
  };

  return (
    <StorageContainer heading="Big File Details" active="home">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 p-4 ">
          <div className="flex items-center justify-between">
            <div
              className="font-semibold cursor-pointer text-brand-700 hover:text-brand-800 hover:underline"
              onClick={() => router.back()}>
              Go back
            </div>
            <Button onClick={() => setIsOpen(true)}>Bid Now</Button>
          </div>
          <div className="">
            <Input label="Name" value={data?.name} disabled />
          </div>
          <div className="flex flex-row gap-4">
            <Input label="Duration" disabled fullWidth value={data?.duration} />
            <Input
              label="Size In GB"
              disabled
              fullWidth
              value={data?.size_in_gb}
            />
            <Input
              label="Expiry"
              fullWidth
              disabled
              value={new Date(data?.expiry!).toLocaleDateString()}
            />
          </div>
          <div className="flex flex-row gap-4">
            <Input
              label="Base Bounty"
              disabled
              fullWidth
              value={data?.base_bounty}
            />
            <Input label="File Type" disabled fullWidth value={fileType()} />
          </div>
          <div>
            <TextArea label="Description" disabled value={data?.description} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-grey-600">
            Storage Provider Activity
          </h1>
          <div className="">
            <div className="flex flex-col w-full max-w-5xl overflow-auto text-sm border border-gray-200 rounded-lg text-grey-800 item-stretch max-h-96">
              <div className="flex flex-row">
                <div className="flex-1 p-4">Date</div>
                <div className="flex-1 p-4">Storage Provider</div>
                <div className="flex-1 p-4">Request Bounty (FIL)</div>
                <div className="flex justify-start flex-1 p-4 ">Selected</div>
                <div className="flex-1 p-4"></div>
              </div>
              {data?.proposals?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row text-black bg-white border-b border-grey-200">
                    <div className="flex-1 p-4">
                      {new Date(data?.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex-1 p-4">
                      {data?.storage_provider_address.toString().slice(0, 5) +
                        "..." +
                        data.storage_provider_address.toString().slice(-5)}
                    </div>
                    <div className="flex-1 p-4">{data?.requested_bounty} </div>
                    <div className="flex justify-start flex-1 p-4">
                      {data?.is_selected ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : null}
                    </div>
                    <div className="flex justify-end flex-1 p-4">
                      <button
                        onClick={() =>
                          router.push(
                            `/storage-provider/details/${data.storage_provider_address}`
                          )
                        }
                        className="text-sm font-semibold uppercase font-raleway text-brand-500 hover:text-brand-600 active:text-blue-500">
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50">
        <div className="fixed inset-0 bg-black/30"></div>
        <div className="fixed inset-0 overflow-y-auto">
          {/* Container to center the panel */}
          <div className="flex items-center justify-center min-h-full p-4">
            <Dialog.Panel className="flex flex-col w-full max-w-lg gap-2 p-4 mx-auto bg-white rounded md:w-1/3 ">
              <Dialog.Title className="px-2 font-semibold text-brand-700 font-raleway">
                Enter detail
              </Dialog.Title>
              <div className="flex flex-col gap-8 p-4 ">
                <div className="">
                  <Input
                    type="number"
                    label="Request Bounty"
                    value={requestedBounty}
                    onChange={(e) => setRequestedBounty(e.target.value)}
                    placeholder="Enter amount in FIL"
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    className=""
                    variant="secondary"
                    onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="self-end"
                    disabled={proposeStorageLoading}>
                    {proposeStorageLoading ? "Bidding..." : "Bid"}
                  </Button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </StorageContainer>
  );
};

export default BigFileDetail;
