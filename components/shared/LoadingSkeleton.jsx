import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className=" h-screen">
      <div className="flex justify-between">
        <div className="w-2/3 h-10 mb-2 mt-2 bg-gray-300 animate-pulse rounded-md "></div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div className="w-10 h-10 mb-2 mt-2 bg-gray-300 animate-pulse rounded-full "></div>
          ))}
        </div>
      </div>

      <div className="w-1/3 h-8 mb-5 mt-2 bg-gray-300 animate-pulse rounded-md "></div>

      <div className="h-20 bg-gray-300 animate-pulse rounded-md mt-20"></div>
      <div className="w-9/12 h-10 bg-gray-300 animate-pulse rounded-md mt-5"></div>
      <div className="w-1/3 h-8 mb-5  bg-gray-300 animate-pulse rounded-md  mt-5"></div>
      <div className="h-10 bg-gray-300 animate-pulse rounded-md mt-20"></div>
      <div className="h-20 bg-gray-300 animate-pulse rounded-md mt-5"></div>
      <div className="h-10 w-1/2 bg-gray-300 animate-pulse rounded-md mt-5"></div>
    </div>
  );
};

export default LoadingSkeleton;
