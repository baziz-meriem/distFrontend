import Image from "next/image";
const Header = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden" data-testid="header">
      <Image
        src="/images/lFlowers.png"
        width={350}
        height="100"
        alt="exaview logo"
        className="absolute -top-10 -left-10"
      ></Image>
      <Image
        src="/images/rFlowers.png"
        width={310}
        height="100"
        alt="exaview logo"
        className="absolute bottom-0 right-0"
      ></Image>
      <div className="md:flex lg:px-32 justify-between px-5">
        <div className="lg:w-1/2 md:pt-60 pt-52">
          <div className="lg:text-5xl text-3xl font-bold">Each Drop</div>
          <div className="lg:text-6xl text-4xl font-bold text-light-green">Perfection!</div>
          <div className="md:text-md text-sm  mt-5">
            Effortlessly Monitor Your Vending Business with Real-Time
            Performance Metrics.
            add some text here becuase we need more 
          </div>
          <button className="btn-green mt-5 md:text-lg text-sm px-10 font-semibold">
            Start Now
          </button>
        </div>
        <div className=" pt-40 hidden md:block">
          <Image
            src="/images/headerimg.png"
            width={480}
            height="100"
            alt="exaview logo"
            className=""
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Header;
