import { useRouter } from "next/router";
import React from "react";

import StorageContainer from "../../components/common/StorageContainer";
import StorageProviderOnboarding from "../../components/common/StorageProviderOnboarding";
import { useAllBigFiles } from "../../hooks/queries/useAllBigFiles";
import { useStorageProviderInfo } from "../../hooks/queries/useStorageProviderInfo";
import { useWalletAddress } from "../../hooks/state/useAppState";

const Home = () => {
  const router = useRouter();
  const [walletAddress] = useWalletAddress();
  const { isError: storageProviderInfoError } =
    useStorageProviderInfo(walletAddress);

  const { data: allBigFiles } = useAllBigFiles("0");

  return (
    <StorageContainer heading="Dashboard" active={"home"}>
      {storageProviderInfoError ? (
        <StorageProviderOnboarding />
      ) : (
        <div className="flex flex-col w-full gap-12 pr-12">
          <div className="pt-4">
            <div className="flex flex-col items-stretch w-full overflow-auto text-sm border border-gray-200 rounded-lg text-grey-800 max-h-96">
              <div className="flex flex-row w-full">
                <div className="flex-1 p-4">File Name</div>
                <div className="flex-1 p-4">
                  File Size{" "}
                  <span className="text-xs font-semibold text-grey-400">
                    GB
                  </span>
                </div>
                <div className="flex-1 p-4">
                  Base Bounty{" "}
                  <span className="text-xs font-semibold text-grey-400">
                    FIL
                  </span>
                </div>
                <div className="flex-1 p-4">
                  Duration{" "}
                  <span className="text-xs font-semibold text-grey-400">
                    days
                  </span>
                </div>
                <div className="flex-1 p-4"></div>
              </div>
              {allBigFiles?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row w-full text-black bg-white border-b border-grey-200">
                    <div className="flex-1 p-4">{data?.name} </div>
                    <div className="flex-1 p-4">{data?.size_in_gb} </div>
                    <div className="flex-1 p-4">{data?.base_bounty} </div>
                    <div className="flex-1 p-4">{data?.duration}</div>
                    <div className="flex justify-end flex-1 p-4">
                      <button
                        onClick={() =>
                          router.push(
                            `/storage-provider/big-file-detail/${data.id}`
                          )
                        }
                        className="text-sm font-semibold uppercase font-raleway text-brand-500 hover:text-brand-600 active:text-blue-500">
                        Bid
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </StorageContainer>
  );
};

export default Home;
