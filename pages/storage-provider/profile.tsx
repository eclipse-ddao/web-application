import { useRouter } from "next/router";
import React from "react";
import Input from "../../components/common/Input";
import StorageContainer from "../../components/common/StorageContainer";
import { useStorageProviderInfo } from "../../hooks/queries/useStorageProviderInfo";
import { useWalletAddress } from "../../hooks/state/useAppState";

const StorageProviderDetail = () => {
  const router = useRouter();
  const [walletAddress] = useWalletAddress();
  const { data: storageProviderInfo } = useStorageProviderInfo(walletAddress);

  return (
    <StorageContainer heading="Your details" active="profile">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 p-4 ">
          <div className="flex items-center justify-between">
            <div
              className="font-semibold cursor-pointer text-brand-700 hover:text-brand-800 hover:underline"
              onClick={() => router.back()}>
              Go back
            </div>
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
    </StorageContainer>
  );
};

export default StorageProviderDetail;
