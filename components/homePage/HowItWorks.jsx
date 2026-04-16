import React from "react";
import {
  faGaugeHigh,
  faBell,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import StepsCards from "./StepsCards";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: faGaugeHigh,
      title: "Overview of key metrics",
      description:
        "Sales-style signals, client growth, and distributor counts surface on the dashboard so you open the app and immediately see how the network is performing.",
    },
    {
      id: 2,
      icon: faBell,
      title: "Notifications & updates",
      description:
        "Stay informed about incidents, maintenance, and opportunities—fewer surprises when machines or regions behave differently than usual.",
    },
    {
      id: 3,
      icon: faBullseye,
      title: "Operational focus",
      description:
        "Lists, maps, and reclamation workflows help teams prioritize routes and responses instead of juggling spreadsheets.",
    },
  ];
  return (
    <section
      className="bg-creem-green/50 py-20 lg:px-32"
      data-testid="how-it-works"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-green md:text-4xl">
            How does it work?
          </h2>
          <div className="mx-auto mt-3 h-2 w-24 rounded-md bg-light-green" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-grey md:text-base">
            Connect your team, then use the dashboard to monitor assets, act on
            alerts, and keep clients and annonceurs aligned—without switching tools
            for every question.
          </p>
        </div>
        <div className="mt-14 flex flex-col gap-8 md:flex-row md:justify-between md:gap-6">
          {steps.map((step) => (
            <StepsCards step={step} key={step.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
