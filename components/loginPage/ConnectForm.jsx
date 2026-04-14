import React, { useState } from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { forgetPassword, getRole, login } from "@/services/authService";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ConnectForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getRole(email);
      console.log("🚀 ~ file: ConnectForm.jsx:29 ~ handleSubmit ~ data:", data)
      const response = await login(email, password, data.role);
      console.log(response.data);
      if (response.data.success) {
        let user = {
          id: response.data.user.id,
          role: response.data.role,
          token: response.data.token,
          name: response.data.user.nom ,
          idClient : response.data.user.idClient
        };
        // set the cookie
        Cookies.set("user", JSON.stringify(user), { expires: 7, path: "/" });
        // toast the success message
        toast.success("logged in");
        // navigate to the dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="relative xl:w-1/3 lg:w-1/3 px-3 md:w-1/2 mx-auto pt-60 ">
      <ToastContainer />
      <div className="googleLogin rounded-md">
        <div className="flex px-3 justify-between bg-effect rounded-md py-3 GoogleLogBtn   bg-creem-green cursor-pointer hover:bg-opacity-0 hover:text-white">
          <div>Log in with Google</div>
          <div>
            <FontAwesomeIcon icon={faGoogle} width="23" />
          </div>
        </div>
      </div>

      <div className="mt-5 py-6 px-5 bg-effect rounded-md border formSection">
        <Image
          src="/logos/greenDevlift.png"
          width={120}
          height="100"
          alt="exaview logo"
          className="block mx-auto"
        ></Image>
        <p className=" text-lg text-center my-7 text-light-green">
          login to your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between border-b  border-gray-400 py-1  my-4">
            <input
              className="bg-transparent outline-none"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              type="text"
            />
            <FontAwesomeIcon icon={faEnvelope} width="20" />
          </div>
          <div className="flex justify-between border-b  border-gray-400 py-1  my-4">
            <input
              className="bg-transparent outline-none"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            <FontAwesomeIcon icon={faLock} width="20" />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-left">
              <Link
                href="./forgetPassword"
                className="text-light-green underline"
              >
                forgot password?
              </Link>
            </div>
            <div className="text-xs text-right">
              dont have an accont?{" "}
              <Link href="/singup" className="text-light-green underline">
                Sign In
              </Link>
            </div>
          </div>
          <div className="flex justify-between  py-1  ">
            <button type="submit" className="btn-green w-full font-semibold">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectForm;
