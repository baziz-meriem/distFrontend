import React from "react";
import StepsCards from "./StepsCards";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Overview of Key Metrics",
      description:
        "Key metrics such as sales, revenue, and customer feedback are prominently displayed on the dashboard.",
    },
    {
      id: 2,
      title: "Notifications and updates",
      description:
        " Receive important notifications and real-time updates about your vending machines effortlessly, keeping you informed about any issues or opportunities. ",
    },
    {
      id: 3,
      title: "Business Management",
      description:
        "Facilitates data-driven decision-making and enables operators to choose well their strategies and offerings to maximize profitability",
    },
  ];
  return (
    <div className="lg:px-32" data-testid="how-it-works">
      <div className="text-center w-fit text-4xl font-bold mx-auto">
        <div>How does it Work ?</div>
        <div className="w-24 h-2 rounded-md bg-light-green ml-auto mr-4"></div>
      </div>
      <div className="flex justify-between py-20">
        {steps.map((step, key) => (
          <StepsCards step={step} key={step.id} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
