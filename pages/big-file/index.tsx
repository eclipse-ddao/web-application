import { Dialog } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import Select from "../../components/common/Select";
import TextArea from "../../components/common/TextArea";
import { useAddBigFile } from "../../hooks/mutations/useAddBigFile";
import { useBigFileForDao } from "../../hooks/queries/useBigFileForDao";

import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";
import { getStatus } from "../../utils/constants";

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

const BigFile = () => {
  const [selectedDaoAddress] = useSelectedDaoAddress();
  const [walletAddress] = useWalletAddress();
  const { mutate: addBigFileMutation, isLoading: addBigFileLoading } =
    useAddBigFile();
  const { data: bigFilesForDao, isLoading: bigFilesForDaoLoading } =
    useBigFileForDao(selectedDaoAddress);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [data, setData] = useState(initialValue);
  const [filter, setFilter] = useState("open");

  useEffect(() => {
    if (!selectedDaoAddress) {
      toast("Please select a Data DAO");
      router.push("/data-dao");
    }
  }, [selectedDaoAddress, router]);

  const handleChange = (value: string | number | Date, name: string) => {
    console.log(value);
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAddBigFileSubmit = () => {
    addBigFileMutation(
      {
        ...data,
        uploaded_by: walletAddress,
        dao_contract_address: selectedDaoAddress,
        expiry: new Date(data.expiry),
        duration: Number(data.duration),
        base_bounty: Number(data.base_bounty),
        size_in_gb: Number(data.size_in_gb),
      },
      {
        onSuccess(result) {
          toast.success("Added big file successfully");
          setIsOpen(false);
          queryClient.fetchQuery(["big-file-dao", selectedDaoAddress]);
        },
      }
    );
  };

  const filesToShow = bigFilesForDao?.filter((file) => {
    if (filter === "open") {
      return file.status === 1 || file.status === 2;
    }
    if (filter === "close") {
      return file.status === 3;
    }
    return false;
  });

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-grey-600">Treasury Balance</h1>
          <div className="flex flex-row items-center gap-2">
            <div className="relative w-10 h-10 rounded-full">
              <Image src={"/images/file.png"} alt="filecoin" layout="fill" />
            </div>
            <p className="text-2xl text-black">2120.34 FIL</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-grey-600">File proposals</h1>
          <div className="flex items-center justify-between">
            <div className="flex font-semibold font-raleway text-grey-700">
              <div
                className={`px-8 py-2 border-b-2 ${
                  filter === "open" ? "border-brand-500" : "border-transparent"
                } cursor-pointer `}
                onClick={() => setFilter("open")}>
                Open
              </div>
              <div
                className={`px-8 py-2 border-b-2 ${
                  filter === "close" ? "border-brand-500" : "border-transparent"
                } cursor-pointer`}
                onClick={() => setFilter("close")}>
                Closed
              </div>
            </div>
            <Button onClick={() => setIsOpen(true)}>Add a big file</Button>
          </div>
          <div className="pt-4">
            <div className="flex flex-col w-full max-w-5xl overflow-auto text-sm border border-gray-200 rounded-lg text-grey-800 item-stretch max-h-96">
              <div className="flex flex-row">
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
                <div className="flex-1 p-4 text-center">Status</div>
                <div className="flex-1 p-4">
                  Duration{" "}
                  <span className="text-xs font-semibold text-grey-400">
                    days
                  </span>
                </div>
                <div className="flex-1 p-4"></div>
              </div>
              {filesToShow?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row text-black bg-white border-b border-grey-200">
                    <div className="flex-1 p-4">{data?.name} </div>
                    <div className="flex-1 p-4">{data?.size_in_gb} </div>
                    <div className="flex-1 p-4">{data?.base_bounty} </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-center justify-center px-3 py-1 text-white rounded-full bg-brand-700">
                        {getStatus(data?.status)}{" "}
                      </div>
                    </div>
                    <div className="flex-1 p-4">{data?.duration}</div>
                    <div className="flex justify-end flex-1 p-4">
                      <button
                        onClick={() =>
                          router.push(`/big-file-detail/${data.id}`)
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
                Enter big file details
              </Dialog.Title>
              <div className="flex flex-col gap-8 p-4 ">
                <div className="">
                  <Input
                    label="Name your Big File"
                    value={data.name}
                    onChange={(e) => handleChange(e.target.value, "name")}
                    placeholder="Research papers 2000-2022"
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <Input
                    label="Duration"
                    fullWidth
                    value={data.duration}
                    onChange={(e) => handleChange(e.target.value, "duration")}
                    placeholder="15 days"
                  />
                  <Input
                    label="Size In GB"
                    fullWidth
                    value={data.size_in_gb}
                    onChange={(e) => handleChange(e.target.value, "size_in_gb")}
                    placeholder="132"
                  />
                  <Input
                    label="Expiry"
                    fullWidth
                    type="date"
                    value={data.expiry.toString()}
                    onChange={(e) => handleChange(e.target.value, "expiry")}
                    placeholder="132"
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <Input
                    label="Base Bounty"
                    fullWidth
                    value={data.base_bounty}
                    onChange={(e) =>
                      handleChange(e.target.value, "base_bounty")
                    }
                    placeholder="250 FIL"
                  />
                  <Select
                    label="File Type"
                    fullWidth
                    value={data.file_type.toString()}
                    onChange={(e) =>
                      handleChange(Number(e.target.value), "file_type")
                    }
                    className="p-2 text-sm border border-gray-200 rounded-lg md:p-3 dark:text-white dark:bg-gray-500 dark:border-gray-800 placeholder:text-gray-400 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-400 focus:outline-non">
                    <option value={"1"}>Link</option>
                    <option value={"2"}>Hardware Delivery</option>
                    <option value={"3"}>Filecoin CID</option>
                  </Select>
                </div>
                <div>
                  <TextArea
                    label="Description"
                    value={data.description}
                    onChange={(e) =>
                      handleChange(e.target.value, "description")
                    }
                    placeholder="Enter something about your big file"
                  />
                </div>
                <Alert
                  type="info"
                  label="Adding big file"
                  subLabel="After having added the big file..."
                  showLearnMore={true}
                />
                <div className="flex justify-between ">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    className="text-black">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddBigFileSubmit}
                    disabled={addBigFileLoading}>
                    {addBigFileLoading ? "Adding.." : "Add"}
                  </Button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BigFile;
