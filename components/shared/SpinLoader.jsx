import React from "react";

const SpinLoader = () => {
  return (
    <div className="flex justify-center items-center  ">
      <div className="my-auto animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-light-green"></div>
    </div>
  );
};

export default SpinLoader;
