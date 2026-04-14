import React from "react";
import Image from "next/image";

const CustomSearch = () => {
  return (
    <div className="border-b-2 border-solid border-gray-300 ">
        <div className="flex items-center justify-center gap-2">
            
            <input
                type="text"
                className="w-64 py-2 pl-10 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
                placeholder="Chercher..."
            />
            <div className="flex items-center justify-center gap-2">
                <Image
                    src="/icons/search.svg"
                    width={22}
                    height="24"
                    alt="search icon"
                ></Image>
                    <Image
                    src="/icons/filter.svg"
                    width={20}
                    height="20"
                    alt="filter icon"
                ></Image>
            </div>
            </div>
            </div>
  );
};

export default CustomSearch;
