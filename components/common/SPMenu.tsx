import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
const SPMenu = ({ active }: { active: string }) => {
  const router = useRouter();

  const details = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
            clipRule="evenodd"
          />
        </svg>
      ),
      name: "Home",
      route: "home",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
            clipRule="evenodd"
          />
        </svg>
      ),
      name: "Your Activity",
      route: "deals",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      name: "Profile",
      route: "profile",
    },
  ];

  return (
    <div className="flex flex-col col-span-3 gap-1 p-8">
      {details.map((info, key) => {
        const isActive = info.route === active;
        return (
          <div
            className={`flex font-medium text-lg items-center gap-4  pl-6 py-3 pr-16 text-gray-500 ${
              isActive ? "bg-brand-100 text-[#274370]" : "hover:bg-grey-100"
            } rounded-r-full cursor-pointer `}
            key={key}
            onClick={() => router.push("/storage-provider/" + info.route)}>
            <span
              className={`${isActive ? "text-[#274370]" : "text-grey-500"}`}>
              {info.icon}
            </span>
            <span className="text-sm whitespace-nowrap">{info.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SPMenu;
