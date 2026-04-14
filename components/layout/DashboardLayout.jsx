import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "../shared/SideBar";
import Image from "next/image";
import Cookies from "js-cookie";
const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const pagesWithoutLayout = [
    "/",
    "/about",
    "/login",
    "/forgetPassword",
    "/resetPassword",
  ];

  const isLayoutDisplayed = () => {
    return pagesWithoutLayout.indexOf(router.pathname) >= 0;
  };

  // useEffect(() => {
  //   let loggedInUser = Cookies.get("user");
  //   if (!loggedInUser && !isLayoutDisplayed()) {
  //     router.push("/login");
  //   }
  // });

  return (
    <div
      className={`${
        !isLayoutDisplayed()
          ? "bg-light-green flex w-full h-screen relative"
          : ""
      }`}
    >
      <div className={`${!isLayoutDisplayed() ? "block w-60 " : "hidden"}`}>
        <SideBar />
      </div>

      <div
        className={`${
          !isLayoutDisplayed()
            ? "bg-creem-green bg-effect overflow-y-auto w-full rounded-l-3xl px-16 py-10 relative"
            : ""
        }`}
      >
        <Image
          src="/images/rFlowers.png"
          width={310}
          height="100"
          alt="exaview logo"
          className="absolute -top-20 right-0"
        ></Image>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
