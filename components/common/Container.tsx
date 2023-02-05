import Image from "next/image";
import React, { FC, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center w-screen h-screen font-poppins bg-gradient-to-tr from-brand-800 to-brand-600 ">
      <div className="fixed w-screen h-screen bg-gradient-to-bl from-black/70 to-black/0" />
      <div className="fixed -bottom-16 animate-spin-slow mix-blend-hard-light">
        <Image
          src={"/images/sphere.webp"}
          alt="Sphere"
          width="800"
          height="800"
        />
      </div>
      <div className="flex flex-col items-center w-full min-h-screen bg-fixed bg-cover bg-paper">
        {children}
      </div>
    </div>
  );
};

export default Container;
