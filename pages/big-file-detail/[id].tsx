import { useRouter } from "next/router";
import React from "react";
import Input from "../../components/common/Input";

import MainContainer from "../../components/common/MainContainer";
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
    <MainContainer heading="Big File Details" active="big-file">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 p-4 ">
          <div className="flex">
            <div
              className="font-semibold cursor-pointer text-brand-700 hover:text-brand-800 hover:underline"
              onClick={() => router.back()}>
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
                        onClick={() => {
                          setSelectedProposalId(data.id);
                          router.push(
                            `/sp-details/${data.storage_provider_address}`
                          );
                        }}
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
    </MainContainer>
  );
};

export default BigFileDetail;
