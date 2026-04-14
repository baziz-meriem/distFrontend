import ConnectForm from "@/components/loginPage/ConnectForm";
import NavBar from "@/components/shared/NavMenu";
import Image from "next/image";
const login = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <NavBar />
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
        <ConnectForm />
      </div>
    </div>
  );
};

export default login;
