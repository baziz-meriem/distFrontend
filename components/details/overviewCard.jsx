import Image from "next/image";
import { React, useState } from "react";

const overviewCard = () => {
  let chargeLevel1 = 80;
  let chargeLevel = 10;

  return (
    <div className=" mt-6 drop-shadow-md shadow-all  ">
        <div className="flex justify-between w-full py-6  ">
            
      <div className="w-1/2  ">
      <div className="flex justify-center relative">
        <Image
          src="/icons/cup.svg"
          width={25}
          height="25"
          alt="user icon"
        ></Image>
        <h1 className="text-lg pl-4">Niveau de charge des  récipients</h1>
        </div>
        <div className="flex justify-center">
        <div className="p-2 w-2/3">
          <p className="text-md text-right">{chargeLevel1}%</p>
          <div className="bg-gray-300 h-2 rounded-full">
            <div
              className={
                chargeLevel1 > 50
                  ? "bg-darker-green h-full rounded-full"
                  : chargeLevel > 30
                  ? "bg-orange h-full rounded-full"
                  : "bg-red-500 h-full rounded-full"
              }
              style={{ width: `${chargeLevel1}%` }}
            ></div>
          </div>
        </div>
        </div>
      </div>
      <div className=" w-1/2 ">
        <div className="flex justify-center relative">
        <Image
          src="/icons/termo.svg"
          width={25}
          height="25"
          alt="user icon"
        ></Image>
        <h1 className="text-xl pl-4">Température de l’eau</h1>
        </div>
        <div className="flex justify-center">
        <div className=" p-2 w-2/3">
          <p className="text-md text-right">{chargeLevel}%</p>
          <div className="bg-gray-300 h-2 rounded-full">
            <div
              className={
                chargeLevel > 50
                  ? "bg-darker-green h-full rounded-full"
                  : chargeLevel > 30
                  ? "bg-orange h-full rounded-full"
                  : "bg-red-500 h-full rounded-full"
              }
              style={{ width: `${chargeLevel}%` }}
            ></div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default overviewCard;
