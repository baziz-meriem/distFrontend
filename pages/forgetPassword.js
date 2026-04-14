import ConnectForm from "@/components/loginPage/ConnectForm";
import NavBar from "@/components/shared/NavMenu";
import { faUser , faEnvelope , faLock } from "@fortawesome/free-solid-svg-icons";

import { forgotPassword } from "@/services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { getRole } from "@/services/authService";

const ForgetPassword = () => {
  const router = useRouter();
    const [email, setEmail] = useState("");  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  const handleForgetPassword = async(e) => {
    e.preventDefault()
try{
    const {data} = await getRole(email)
    const request = await forgotPassword(email,data.role) ; 
    console.log(request)
    if(request.data.success){
        localStorage.setItem("role", data.role);
        toast.success(request.data.message);
        setEmail("")
    }
}catch(e){
    toast.error(e.message);
    setEmail("")
}
  };
    return (
        <div className="h-screen w-full relative overflow-hidden">
                <ToastContainer />
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
      <div className="relative xl:w-1/3 lg:w-1/3 px-3 md:w-1/2 mx-auto pt-60 ">

      <div className="mt-5 py-6 px-5 bg-effect rounded-md border formSection">
        <Image
          src="/logos/greenDevlift.png"
          width={120}
          height="100"
          alt="exaview logo"
          className="block mx-auto"
        ></Image>
        <p className=" text-lg text-center my-7 text-light-green">forget password? Reset it</p>
     
  <form onSubmit={handleForgetPassword} >
  <div className="flex justify-between border-b  border-gray-400 py-1  my-4">
          <input className="bg-transparent outline-none" placeholder="Email"  value={email}  onChange={handleEmailChange} type="text"/>
          <FontAwesomeIcon icon={faEnvelope} width="20" />
        </div>
     
        <div className="flex justify-between  py-1  ">
         <button type="submit" className="btn-green w-full font-semibold">Send</button>
        </div>
  </form>
      </div>
      </div>
      </div>
    </div>
    );
};

export default ForgetPassword;