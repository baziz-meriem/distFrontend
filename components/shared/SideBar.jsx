import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBell,
  faUsers,
  faHardDrive,
  faUser,
  faRectangleAd,
  faTriangleExclamation,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { hasAccess } from "../../utils/accessControl";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";

const SideBar = () => {
  const router = useRouter();
  const Links = [
    {
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
      label: "dashboard",
      icon: faHome,
    },
    {
      id: 2,
      name: "Notifications",
      link: "/notifications",
      label: "notifications",
      icon: faBell,
    },
    {
      id: 3,
      name: "Account management",
      link: "/gestionComptes",
      label: "createAgents",
      icon: faUsers,
    },
    {
      id: 4,
      name: "Distributors",
      link: "/listes/Distributeurs/AC",
      label: "distributeurs",
      icon: faHardDrive,
    },
    {
      id: 7,
      name: "Ads",
      link: "/listes/Annonceur",
      label: "annonce",
      icon: faRectangleAd,
    },
    {
      id: 8,
      name: "Claims",
      link: "/listes/Reclamations",
      label: "reclamations",
      icon: faTriangleExclamation,
    },

    {
      id: 10,
      name: "Statistics",
      link: "/statistics",
      label: "stats",
      icon: faChartBar,
    },
    {
      id: 5,
      name: "My profile",
      link: "/profile",
      label: "profil",
      icon: faUser,
    },
  ];

  const [loggedInUser, setUser] = useState(null);
  useEffect(() => {
    if (!loggedInUser) {
      const cookieValue = Cookies.get("user");
      if (cookieValue) {
        setUser(JSON.parse(cookieValue));
      }
    }
  });

  return (
    <div className="px-5 py-14">
      <div className="flex justify-between px-5">
        <Image
          src="/icons/whiteham.png"
          width={30}
          height="10"
          alt="exaview logo"
          className="w-8 h-5 mt-2 cursor-pointer"
        ></Image>
        <Image
          src="/logos/whitelogo.png"
          width={40}
          height="100"
          alt="exaview logo"
          className="w-10 h-10 cursor-pointer"
        ></Image>
      </div>
      <nav className="mt-10" aria-label="Main">
        {Links.map((item, key) =>
          loggedInUser && hasAccess(loggedInUser.role, item.label) ? (
            <Link
              href={item.link}
              key={item.id}
              className={`${
                router.pathname === item.link
                  ? "bg-dark-green font-medium"
                  : ""
              } text-white px-3 py-3 rounded-md my-3 font-md flex items-center gap-2 hover:bg-dark-green/50`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                color="white"
                className="text-sm"
                width="15"
              />
              <span className="text-sm">{item.name}</span>
            </Link>
          ) : null
        )}
      </nav>
    </div>
  );
};

export default SideBar;
