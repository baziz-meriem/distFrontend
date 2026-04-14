import Image from "next/image";

const HowHelp = () => {
  return (
    <div className="flex py-32 lg:px-32 gap-20 justify-between relative" data-testid="how-help">
      <Image
        src="/images/rFlowers.png"
        width={310}
        height="100"
        alt="exaview logo"
        className="absolute bottom-0 right-0"
      ></Image>
      <div className="w-1/2 xl:pr-16">
        <div className="text-3xl font-bold mt-5">How will this help you ?</div>
        <div className="text-sm mt-5">
          Get a real-time overview of your business performance with key
          metrics, including sales, revenue, and customer feedback. Stay on top
          of your inventory and supplies with our easy-to-use interface. Track
          your employees' performance and get important announcements and
          real-time updates about your vending machines effortlessly !
        </div>
        <button className="btn-green mt-5">Go to dashboard</button>
      </div>
      <div>
        <Image
          src="/images/howhelp.png"
          width={480}
          height="100"
          alt="exaview logo"
          className="relative"
        ></Image>
      </div>
    </div>
  );
};

export default HowHelp;
