import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";

const heroStats = [
  { label: "Dashboard modules", value: "10+" },
  { label: "Real-time views", value: "Maps & charts" },
  { label: "Roles supported", value: "Admin → field" },
];

const Header = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden pb-16 md:pb-24"
      data-testid="header"
    >
      <Image
        src="/images/lFlowers.png"
        width={350}
        height={100}
        alt=""
        className="absolute -top-10 -left-10 opacity-90"
        priority
      />
      <Image
        src="/images/rFlowers.png"
        width={310}
        height={100}
        alt=""
        className="absolute bottom-0 right-0 opacity-90"
      />
      <div className="relative z-10 flex flex-col justify-between gap-12 px-5 md:flex-row md:items-center lg:px-32 lg:pt-24">
        <div className="max-w-xl pt-36 md:pt-28 lg:pt-32">
          <p className="mb-3 inline-block rounded-full border border-light-green/40 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-wide text-dark-green">
            Vending operations platform
          </p>
          <h1 className="text-4xl font-bold leading-tight text-dark-green md:text-5xl lg:text-6xl">
            Each drop.
            <span className="block text-light-green">Perfect visibility.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-grey md:text-lg">
            Monitor distributors, inventory, and teams from one place. See maps,
            statistics, reclamations, and announcements—so you react fast when
            performance shifts or machines need attention.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="btn-green inline-flex items-center gap-2 px-8 py-3 text-base font-semibold shadow-all transition hover:opacity-95"
            >
              Sign in to dashboard
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="btn-border-green inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            >
              <FontAwesomeIcon icon={faPlay} className="h-3 w-3" />
              About the product
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-4 border-t border-gray-200/80 pt-10 sm:grid-cols-3">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/50 px-4 py-3 text-center shadow-sm backdrop-blur-sm sm:text-left"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-grey">
                  {s.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-dark-green">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-lg shrink-0 md:mx-0 md:max-w-xl md:pt-12">
          <div className="relative rounded-3xl bg-gradient-to-br from-light-green/20 to-transparent p-2 shadow-all">
            <Image
              src="/images/headerimg.png"
              width={480}
              height={400}
              alt="Dashboard preview illustration"
              className="h-auto w-full rounded-2xl object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
