import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import StorageContainer from "../../components/common/StorageContainer";
import StorageProviderOnboarding from "../../components/common/StorageProviderOnboarding";
import { useMakeDeal } from "../../hooks/mutations/useMakeDeal";
import { useStorageProviderInfo } from "../../hooks/queries/useStorageProviderInfo";
import {
  useSelectedProposalId,
  useWalletAddress,
} from "../../hooks/state/useAppState";

const Deals = () => {
  const [walletAddress] = useWalletAddress();
  const [selectedProposalId, setSelectedProposalId] = useSelectedProposalId();
  const [isOpen, setIsOpen] = useState(false);
  const { data: storageProviderInfo, isError: storageProviderInfoError } =
    useStorageProviderInfo(walletAddress);
  const [cid, setCid] = useState("");

  const { mutate: makeDealMutation, isLoading: makeDealLoading } =
    useMakeDeal();

  const handleSubmit = () => {
    makeDealMutation(
      {
        deal_cid: cid,
        proposal_id: selectedProposalId,
        storage_provider_address: walletAddress,
      },
      {
        onSuccess(data) {
          toast.success("Successfully Confirmed Deal");
          setCid("");
          setSelectedProposalId(0);
          setIsOpen(false);
        },
        onError(err) {
          toast.error("There was some problem confirming the deal");
        },
      }
    );
  };

  return (
    <StorageContainer heading="Your Activity" active={"deals"}>
      {storageProviderInfoError ? (
        <StorageProviderOnboarding />
      ) : (
        <div className="flex flex-col w-full gap-12 pr-12">
          <div className="flex flex-col gap-4">
            <div className="">
              <div className="flex flex-col w-full max-w-5xl overflow-auto text-sm border border-gray-200 rounded-lg text-grey-800 item-stretch max-h-96">
                <div className="flex flex-row">
                  <div className="flex-1 p-4">Date</div>
                  <div className="flex-1 p-4">Storage Provider</div>
                  <div className="flex-1 p-4">Request Bounty (FIL)</div>
                  <div className="flex justify-start flex-1 p-4 ">Selected</div>
                  <div className="flex-1 p-4"></div>
                </div>
                {storageProviderInfo?.proposals?.map((data, index) => {
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
                      <div className="flex-1 p-4">
                        {data?.requested_bounty}{" "}
                      </div>
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
                        {data.is_selected && (
                          <button
                            onClick={() => {
                              setSelectedProposalId(data.id);
                              setIsOpen(true);
                            }}
                            className="text-sm font-semibold uppercase font-raleway text-brand-500 hover:text-brand-600 active:text-blue-500">
                            Accept Deal
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
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
                Please make a deal with the client and enter the Deal CID here.
                An escrow will be created in for this deal on Eclipse
              </Dialog.Title>
              <div className="flex flex-col gap-8 p-4 ">
                <div className="">
                  <Input
                    type="number"
                    label="CID"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
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
                    disabled={makeDealLoading}>
                    {makeDealLoading ? "Accepting..." : "Accept"}
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

export default Deals;
