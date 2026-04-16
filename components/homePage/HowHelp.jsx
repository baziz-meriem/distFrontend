import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const HowHelp = () => {
  return (
    <section
      className="relative overflow-hidden py-20 lg:px-32 lg:py-28"
      data-testid="how-help"
    >
      <Image
        src="/images/rFlowers.png"
        width={310}
        height={100}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 opacity-80"
      />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 lg:flex-row lg:justify-between lg:gap-20">
        <div className="w-full max-w-xl lg:pr-8">
          <h2 className="text-3xl font-bold text-dark-green md:text-4xl">
            Built for teams on the move
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-grey md:text-base">
            Whether you oversee a handful of distributors or a regional fleet, you
            get a single place to review performance, coordinate agents (AC, AM,
            DE), and keep clients in the loop. Less time hunting for data—more time
            fixing what matters.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-dark-green">
            <li className="flex gap-2">
              <span className="text-light-green">✓</span>
              Role-aware navigation so admins and field roles see what they need.
            </li>
            <li className="flex gap-2">
              <span className="text-light-green">✓</span>
              Statistics and maps to compare regions and time ranges.
            </li>
            <li className="flex gap-2">
              <span className="text-light-green">✓</span>
              Reclamations and notifications to shorten response times.
            </li>
          </ul>
          <Link
            href="/login"
            className="btn-green mt-8 inline-flex items-center gap-2 px-8 py-3 font-semibold"
          >
            Open dashboard
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Link>
        </div>
        <div className="w-full max-w-lg shrink-0">
          <div className="rounded-3xl bg-white/60 p-4 shadow-all">
            <Image
              src="/images/howhelp.png"
              width={480}
              height={360}
              alt="Team collaboration illustration"
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowHelp;
