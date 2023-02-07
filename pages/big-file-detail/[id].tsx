import { useRouter } from "next/router";
import React from "react";
import Input from "../../components/common/Input";

import TextArea from "../../components/common/TextArea";
import { useBigFileInfo } from "../../hooks/queries/useBigFileInfo";

import { useSelectedProposalId } from "../../hooks/state/useAppState";
import { getStatus } from "../../utils/constants";

const BigFileDetail = () => {
  const router = useRouter();
  const bigFileId = router.query.id;
  const [, setSelectedProposalId] = useSelectedProposalId();
  const { data } = useBigFileInfo(bigFileId as string);

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

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8 p-4 ">
        <div className="flex">
          <div
            className="font-semibold cursor-pointer text-brand-700 hover:text-brand-800 hover:underline"
            onClick={() => router.back()}
          >
            Go back
          </div>
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
          <Input
            label="Status"
            disabled
            fullWidth
            value={getStatus(data?.status!)}
          />
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
              <div className="flex-1 p-4">Storage Provider</div>
              <div className="flex-1 p-4">Contact Details</div>
              <div className="flex-1 p-4">Request Bounty (FIL)</div>
              <div className="flex-1 p-4">Selected</div>
              <div className="flex-1 p-4"></div>
            </div>
            {data?.proposals?.map((proposal, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row text-black bg-white border-b border-grey-200"
                >
                  <div className="flex-1 p-4">
                    {new Date(proposal?.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex-1 p-4">
                    {proposal?.storage_provider_address.toString().slice(0, 5) +
                      "..." +
                      proposal.storage_provider_address.toString().slice(-5)}
                  </div>
                  <div className="flex-1 p-4">
                    {proposal?.requested_bounty}{" "}
                  </div>
                  <div className="flex justify-start flex-1 p-4">
                    {proposal?.is_selected ? (
                      <div className="flex items-center justify-center px-3 py-1 text-white rounded-full bg-brand-700">
                        {"SELECTED"}
                      </div>
                    ) : data.status == 1 ? (
                      <div className="flex items-center justify-center px-3 py-1 text-white rounded-full bg-brand-600">
                        {"PENDING"}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center px-3 py-1 text-white rounded-full bg-brand-700">
                        {"NOT SELECTED"}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end flex-1 p-4">
                    <button
                      onClick={() => {
                        setSelectedProposalId(proposal.id);
                        router.push(
                          `/sp-details/${proposal.storage_provider_address}`
                        );
                      }}
                      className="text-sm font-semibold uppercase font-raleway text-brand-500 hover:text-brand-600 active:text-blue-500"
                    >
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
  );
};

export default BigFileDetail;
