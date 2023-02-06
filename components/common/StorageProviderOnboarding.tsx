import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateStorageProvider } from "../../hooks/mutations/useCreateStorageProvider";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";
import Alert from "./Alert";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import { toast } from "react-hot-toast";

const initialData = {
  address: "",
  avatar_url: "",
  contact_info: "",
  description: "",
  name: "",
  reputation_link: "",
};

const StorageProviderOnboarding = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useWalletAddress();
  const [selectedDao, setSelectedDao] = useSelectedDaoAddress();
  const {
    mutate: createStorageProviderMutation,
    isLoading: createStorageProviderLoading,
  } = useCreateStorageProvider();

  const [data, setData] = useState(initialData);

  const handleSubmit = () => {
    createStorageProviderMutation(
      {
        ...data,
        address: walletAddress,
      },
      {
        onSuccess(result) {
          console.log;
          toast.success("Successfully created your account");
          queryClient.invalidateQueries(["storage-provider", walletAddress]);
        },
        onError() {
          toast.error("Something wrong while creating your account");
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
    <div className="flex flex-col max-w-2xl gap-8 p-10 mx-auto border border-grey-200 rounded-xl ">
      <div className="flex gap-4">
        <Input
          label="Name"
          fullWidth
          value={data.name}
          onChange={(e) => handleChange(e.target.value, "name")}
          placeholder="Enter you name"
        />
        <Input
          label="Contact"
          value={data.contact_info}
          fullWidth
          onChange={(e) => handleChange(e.target.value, "contact_info")}
          placeholder="Enter you email for contact"
        />
      </div>

      <div className="">
        <Input
          label="Avatar Url"
          value={data.avatar_url}
          onChange={(e) => handleChange(e.target.value, "avatar_url")}
          placeholder="Add your avatar url"
        />
      </div>
      <div className="">
        <Input
          label="Reputation Link"
          value={data.reputation_link}
          onChange={(e) => handleChange(e.target.value, "reputation_link")}
          placeholder="Enter your reputation link"
        />
      </div>
      <div className="flex flex-col gap-2">
        <TextArea
          label="Description"
          value={data.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          placeholder="Tell us something about you..."
        />
        <p className="text-xs text-grey-400">
          We recommend descriptions between 50 and 160 characters.
        </p>
      </div>
      <Alert
        type="info"
        label="Creating account"
        subLabel="After having created the account you can view all the big file requests"
      />
      <div className="flex justify-between ">
        <Button variant="secondary" className="text-black">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={createStorageProviderLoading}>
          {createStorageProviderLoading ? "Creating.." : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default StorageProviderOnboarding;
