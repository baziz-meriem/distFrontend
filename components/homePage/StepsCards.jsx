import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StepsCards = ({ step }) => {
  return (
    <div className="group flex flex-1 flex-col rounded-2xl border border-gray-200/90 bg-white px-6 py-10 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-light-green/40 hover:shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-light-green/20 text-light-green transition group-hover:bg-light-green/30">
        <FontAwesomeIcon icon={step.icon} className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-dark-green">{step.title}</h3>
      <p className="mt-4 flex-1 text-left text-sm leading-relaxed text-grey">
        {step.description}
      </p>
    </div>
  );
};

export default StepsCards;
