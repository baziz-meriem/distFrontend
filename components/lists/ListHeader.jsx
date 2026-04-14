import React from "react";
import Image from "next/image";
import CustomSearch from "@/components/lists/CustomSearch";

const ListHeader = ({ title }) => {
  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <Image
            src="/icons/user-black.svg"
            width={30}
            height="30"
            alt="user icon"
          ></Image>
          <div className="text-xl font-medium tracking-2">{title}</div>
        </div>
        <div className="flex">
          <CustomSearch />
        </div>
      </div>
    </div>
  );
};

export default ListHeader;
