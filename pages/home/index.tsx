import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import MainContainer from "../../components/common/MainContainer";
import { FileMutationDto } from "../../endpoints/files";
import { FileResponse } from "../../endpoints/users";
import { useAddFile } from "../../hooks/mutations/useAddFile";
import { useDecryptAndDownloadFile } from "../../hooks/mutations/useDecryptAndDownloadFile";
import { useEncryptAndUploadFile } from "../../hooks/mutations/useEncryptAndUploadFile";
import { useDaoInfo } from "../../hooks/queries/useDaoInfo";
import { useSingleUserInfo } from "../../hooks/queries/useSingleUserInfo";
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
  const { data: singleUserInfo } = useSingleUserInfo(walletAddress);
  const { data: daoInfo } = useDaoInfo(selectedDaoAddress);
  const {
    mutate: encryptAndUploadFileMutation,
    isLoading: encryptAndUploadFileLoading,
  } = useEncryptAndUploadFile();

  const {
    mutate: decryptAndDownloadFileMutation,
    isLoading: decryptAndDownloadFileLoading,
  } = useDecryptAndDownloadFile();

  const { mutate: addFileMutation, isLoading: addFileLoading } = useAddFile();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!selectedDaoAddress) {
      router.push("/data-dao");
    }
  }, [selectedDaoAddress, router]);

  useEffect(() => {
    if (singleUserInfo?.daos.length === 0) {
      router.push("/data-dao");
    }
  }, [singleUserInfo?.daos.length, router]);

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
    <MainContainer heading="Getting started" active={"home"}>
      <div className="flex flex-col w-full gap-12 pr-12">
        <div className="flex flex-col w-full gap-2 pb-10 border-b border-grey-200">
          <div className="text-3xl font-semibold">
            Welcome to {daoInfo?.name} 🎉
          </div>
          <div className="text-xs font-semibold text-grey-500">
            Quickly get started with the best way manage and upload files. Less
            confusion more privacy
          </div>
          <div className="text-sm font-semibold text-grey-600">
            {daoInfo?.description}
          </div>
        </div>

        <div className="flex flex-col self-start gap-8 " {...getRootProps()}>
          <div className="flex flex-col gap-2 ">
            <div className="text-lg font-semibold text-brand-700">
              Upload File
            </div>
            <div className="flex flex-row items-center gap-2 p-4 pr-20 border rounded-lg cursor-pointer border-grey-200">
              <div className="p-4 rounded-md bg-brand-100 text-brand-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
              </div>
              <input type="file" {...getInputProps()} />
              <div className="">
                Click or just <span className="font-semibold">drag</span> your
                files here
              </div>
            </div>
          </div>
        </div>
        {(addFileLoading || encryptAndUploadFileLoading) && (
          <div className="flex items-center gap-2 font-semibold text-amber-600">
            UPLODING
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-spin">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
              />
            </svg>
          </div>
        )}

        {files && files!.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold text-brand-700">
              Files{" "}
              <span className="text-sm font-semibold text-grey-400 font-raleway">
                (click to decrypt and download file)
              </span>
            </div>
            <div className="flex flex-row flex-wrap gap-4 pb-4 overflow-auto h-96">
              {files.map((file) => {
                return (
                  <div
                    onClick={() => {
                      if (currentFile === file.cid) {
                        return;
                      }
                      setCurrentFile(file.cid);
                      downloadFile(file);
                    }}
                    className="flex-shrink-0 w-64 border rounded-lg cursor-pointer border-grey-200"
                    key={file.id}>
                    <div className="relative w-full h-44">
                      <Image
                        src={"/images/placeholder.png"}
                        objectFit="cover"
                        alt="placeholder image"
                        layout="fill"
                      />
                    </div>
                    <div className="flex flex-col p-4 ">
                      {decryptAndDownloadFileLoading &&
                        currentFile === file.cid && (
                          <div className="flex items-center gap-1 font-semibold text-amber-700">
                            <>Decrypting</>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 animate-spin">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                              />
                            </svg>
                          </div>
                        )}{" "}
                      {fileUrl && currentFile === file.cid && (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-amber-500">
                          View File
                        </a>
                      )}
                      {file?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </MainContainer>
  );
};

export default Home;
