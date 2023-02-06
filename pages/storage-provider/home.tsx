import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import StorageContainer from "../../components/common/StorageContainer";
import StorageProviderOnboarding from "../../components/common/StorageProviderOnboarding";
import { FileMutationDto } from "../../endpoints/files";
import { FileResponse } from "../../endpoints/users";
import { useAddFile } from "../../hooks/mutations/useAddFile";
import { useDecryptAndDownloadFile } from "../../hooks/mutations/useDecryptAndDownloadFile";
import { useEncryptAndUploadFile } from "../../hooks/mutations/useEncryptAndUploadFile";
import { useAllBigFiles } from "../../hooks/queries/useAllBigFiles";
import { useDaoInfo } from "../../hooks/queries/useDaoInfo";
import { useStorageProviderInfo } from "../../hooks/queries/useStorageProviderInfo";
import {
  useSelectedDaoAddress,
  useWalletAddress,
} from "../../hooks/state/useAppState";

const Home = () => {
  const router = useRouter();
  const [selectedDaoAddress] = useSelectedDaoAddress();
  const [walletAddress] = useWalletAddress();
  const [fileUrl, setFileUrl] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const { data: storageProviderInfo, isError: storageProviderInfoError } =
    useStorageProviderInfo(walletAddress);

  const { data: allBigFiles } = useAllBigFiles("0");

  const { data: daoInfo } = useDaoInfo(selectedDaoAddress);

  const {
    mutate: encryptAndUploadFileMutation,
    isLoading: encryptAndUploadFileLoading,
  } = useEncryptAndUploadFile();

  // const {} =  useSelectProposal()

  const {
    mutate: decryptAndDownloadFileMutation,
    isLoading: decryptAndDownloadFileLoading,
  } = useDecryptAndDownloadFile();

  const { mutate: addFileMutation, isLoading: addFileLoading } = useAddFile();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (!selectedDaoAddress) {
  //     router.push("/data-dao");
  //   }
  // }, [selectedDaoAddress, router]);

  // useEffect(() => {
  //   if (singleUserInfo?.daos.length === 0) {
  //     router.push("/data-dao");
  //   }
  // }, [singleUserInfo?.daos.length, router]);

  const files = useMemo(() => daoInfo?.files, [daoInfo?.files?.length]);

  useEffect(() => {
    console.log("DAO", selectedDaoAddress);
  }, [selectedDaoAddress]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      console.log("___FILES: ", acceptedFiles, selectedDaoAddress);
      handleUpload({ target: { files: acceptedFiles }, persist: () => {} });
    },
    [selectedDaoAddress]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleUpload = (e: any) => {
    encryptAndUploadFileMutation(
      { daoAddress: selectedDaoAddress, e },
      {
        onSuccess(res) {
          const body: FileMutationDto = {
            cid: res,
            dao_contract_address: selectedDaoAddress,
            file_name: e.target.files[0].name,
            file_type: e.target.files[0].type,
            image_url:
              "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
            uploaded_by: walletAddress,
          };
          console.log("___FILE UPLOAD BODY", body);
          addFileMutation(body, {
            async onSuccess(result) {
              console.log(result);
              toast.success("Successfully uploaded file");
              await queryClient.fetchQuery(["dao", selectedDaoAddress]);
            },
            onError(err) {
              toast.error("Some error while creating!");
            },
          });
        },
        onError(err) {
          toast.error("Some error while creating");
        },
      }
    );
  };

  const downloadFile = (file: FileResponse) => {
    setFileUrl("");
    decryptAndDownloadFileMutation(
      {
        cid: file.cid,
        fileType: file.file_type,
      },
      {
        onSuccess(result) {
          console.log(result);
          const url = URL.createObjectURL(result);
          console.log("___URL", result, url);
          setFileUrl(url);
        },
        onError(err: any) {
          toast.error(err.message);
        },
      }
    );
  };

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
                        {/* View */}
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
