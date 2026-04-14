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
      name: "Dashbord",
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
      name: "Gestion des comptes",
      link: "/gestionComptes",
      label: "createAgents",
      icon: faUsers,
    },
    {
      id: 4,
      name: "Nos distributeurs",
      link: "/listes/Distributeurs/AC",
      label: "distributeurs",
      icon: faHardDrive,
    },
    {
      id: 7,
      name: "Annonces",
      link: "/listes/Annonceur",
      label: "annonce",
      icon: faRectangleAd,
    },
    {
      id: 8,
      name: "Réclamations",
      link: "/listes/Reclamations",
      label: "reclamations",
      icon: faTriangleExclamation,
    },

    {
      id: 10,
      name: "Statistiques",
      link: "/statistics",
      label: "stats",
      icon: faChartBar,
    },
    {
      id: 5,
      name: "Mon profil",
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
       // console.log(JSON.parse(cookieValue));
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
      <div className="mt-10">
        {Links.map((link, key) =>
          loggedInUser && hasAccess(loggedInUser.role, link.label) ? (
            <div
              key={key}
              className={`${  
                router.pathname == link.link
                  ? "bg-dark-green font-medium cursor-pointer"
                  : ""
              } text-white px-3 py-3 rounded-md my-3 font-md flex`}
            >
              <FontAwesomeIcon
                icon={link.icon}
                color="white"
                className="text-sm"
                width="15"
              />
              <Link href={link.link} className="ml-2 text-sm">
                {link.name}
              </Link>
            </div>
          ) : (
            <div></div>
          )
        )}
      </div>
    </div>
  );
};

export default SideBar;
