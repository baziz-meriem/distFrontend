import SignUpForm from "@/components/loginPage/SignUpForm";
import NavBar from "@/components/shared/NavMenu";
import Image from "next/image";

const Signup = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <NavBar />
      <Image
        src="/images/lFlowers.png"
        width={350}
        height={100}
        alt=""
        className="absolute -top-10 -left-10"
      />
      <Image
        src="/images/rFlowers.png"
        width={310}
        height={100}
        alt=""
        className="absolute bottom-0 right-0"
      />
      <div className="lg:px-32 justify-between px-5">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
