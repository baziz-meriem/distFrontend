import NavBar from "@/components/shared/NavMenu";
import Image from "next/image";
const About = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden">
        <NavBar/>
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
      <div className=" lg:px-32 justify-between px-5">
        <div className="lg:w-2/3 md:pt-60 pt-52">
          <div className="lg:text-5xl text-3xl font-bold">About</div>
          <div className="lg:text-6xl text-4xl font-bold text-light-green">
            DEVLIFT!
          </div>
          <div className="md:text-md text-sm  mt-5">
            We are a team of skilled developers, designers, and project managers
            specialized in creating custom software solutions, web and mobile
            applications, and e-commerce platforms for your businesses. Our
            collaborative approach ensures that we understand our clients'
            unique needs and create tailored solutions that exceed expectations.
            We use the latest technologies and industry best practices to
            deliver high-quality results on time and within budget. Contact us
            to see how we can help your business achieve its goals.
          </div>
          <button className="btn-green mt-5 md:text-lg text-sm px-10 font-semibold">
            Contact US
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
