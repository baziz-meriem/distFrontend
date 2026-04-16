import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faChartLine,
  faTriangleExclamation,
  faRectangleAd,
} from "@fortawesome/free-solid-svg-icons";

const highlights = [
  {
    icon: faMapLocationDot,
    title: "Live distributor map",
    text: "See every machine and its status on an interactive map—no guesswork when something needs attention.",
  },
  {
    icon: faChartLine,
    title: "Sales & trends",
    text: "Charts for revenue, clients, and regional performance so you can spot patterns early.",
  },
  {
    icon: faTriangleExclamation,
    title: "Claims & support",
    text: "Track issues and responses in one place so your team stays aligned with customers.",
  },
  {
    icon: faRectangleAd,
    title: "Ads & campaigns",
    text: "Coordinate advertising and pricing across your network from a single dashboard.",
  },
];

const HomeHighlights = () => {
  return (
    <section
      className="relative border-y border-light-green/30 bg-white/60 py-16 backdrop-blur-sm lg:px-32"
      aria-labelledby="highlights-heading"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="highlights-heading"
          className="text-center text-2xl font-bold text-dark-green md:text-3xl"
        >
          Everything operators need in one place
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-grey md:text-base">
          Built for teams managing vending-style distributors, field agents, and
          client accounts—whether you run analytics daily or jump in for urgent fixes.
        </p>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-gray-200/80 bg-creem-green/80 p-6 shadow-sm transition hover:border-light-green/50 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-green/25 text-light-green">
                <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-dark-green">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeHighlights;
