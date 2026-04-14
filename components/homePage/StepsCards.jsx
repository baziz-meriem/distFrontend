import React from "react";

const StepsCards = ({ step }) => {
  return (
    <div className="bg-creem-green bg-effect px-5 py-10 text-center w-1/4 cursor-pointer hover:shadow-2xl">
      <div className="text-2xl font-bold">{step.title}</div>
      <div className="text-sm mt-5 text-gray-500">{step.description}</div>
    </div>
  );
};

export default StepsCards;
