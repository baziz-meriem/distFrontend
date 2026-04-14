import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

const PageHeader = ({ title, description }) => {
  const router = useRouter();
  const logOut = () => {
    Cookies.remove("user");
    router.push("/login");
  };
  return (
    <div className="flex justify-between">
      <div>
        <div className="text-4xl font-bold">{title}</div>{" "}
        <div className="mt-1 text-grey">{description}</div>
      </div>
      <div className="flex">
        <FontAwesomeIcon icon={faBell} className="text-2xl mx-4 mt-2" />
        <Link href='/profile' className=" w-10 h-10 rounded-full relative overflow-hidden">
          <Image
            src="/images/user.jpg"
            width={100}
            height="100"
            alt="exaview logo"
          ></Image>
        </Link>

        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className="relative text-2xl mx-4 mt-2 cursor-pointer"
          onClick={logOut}
        />
      </div>
    </div>
  );
};

export default PageHeader;
