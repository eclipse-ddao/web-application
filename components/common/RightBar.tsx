import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { useSelectedDaoAddress } from "../../hooks/state/useAppState";
import { useDaoInfo } from "../../hooks/queries/useDaoInfo";
const RightBar = () => {
  const [selectedDaoAddress] = useSelectedDaoAddress();

  const { data: daoInfo } = useDaoInfo(selectedDaoAddress);

  const members = daoInfo?.members;

  return (
    <div className="relative flex flex-col gap-4 py-8 pl-6 pr-20 overflow-x-hidden text-black bg-brand-100">
      <div className="absolute -top-10 -right-16 mix-blend-hard-light">
        <Image
          src={"/images/sphere.webp"}
          alt="Sphere"
          width="150"
          height="150"
        />
      </div>
      <div className="absolute top-32 -right-16 mix-blend-hard-light">
        <Image
          src={"/images/sphere.webp"}
          alt="Sphere"
          width="100"
          height="100"
        />
      </div>
      <div className="absolute bottom-24 -right-44 mix-blend-hard-light">
        <Image
          src={"/images/sphere.webp"}
          alt="Sphere"
          width="250"
          height="250"
        />
      </div>
      <span className="font-medium">members</span>

      <div className="flex flex-col gap-2">
        {members?.map((member) => (
          <ContactInfo
            key={member.address}
            image={member.avatar_url}
            address={member.address}
            name={member.username}
          />
        ))}
        {/* <ContactInfo image="Avatar" name="Cameron Williamson" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" />
        <ContactInfo image="Avatar" name="0x923099dsdhb" /> */}
      </div>
    </div>
  );
};

type ContactType = {
  image: string;
  name: string;
  address: string;
};
const ContactInfo: FC<ContactType> = ({ image, name, address }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 overflow-hidden rounded-full">
        {image.length > 0 ? (
          //  eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={"member image"} />
        ) : (
          //  eslint-disable-next-line @next/next/no-img-element
          <img
            src={
              "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            }
            alt={"member image"}
          />
        )}
      </div>
      {name.length > 0 ? (
        <span className="text-xs font-semibold text-grey-800 ">{name}</span>
      ) : (
        <span className="text-xs font-semibold text-grey-800">
          {address.toString().slice(0, 4) +
            "..." +
            address.toString().slice(-4)}
        </span>
      )}
    </div>
  );
};

export default RightBar;
