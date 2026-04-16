import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import AnnonceCard from "./AnnonceCard";
import Loader from "../shared/Loader";

const ListeAnnonce = ({ loadingAnnonce, setLoading }) => {
  const router = useRouter();
  const { id } = router.query;

  // states
  const [annonces, setAnnonces] = useState(null);
  // functions
  const getAnnonces = () => {
    axios
      .get(
        `https://distbackend-96a5.onrender.com/api/v1/annonce/annonce/annonceur/${id}`
      )
      .then((data) => {
        setAnnonces(data.data.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    loadingAnnonce && id && getAnnonces();
  }, [id, loadingAnnonce]);
  return (
    <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
      <div className="flex items-center">
        <Image
          src="/icons/user-black.svg"
          width={30}
          height="30"
          alt="user icon"
        ></Image>
        <div className="text-xl font-medium tracking-1">Ad list</div>
      </div>
      <div className="flex flex-wrap  py-5">
        {annonces && !loadingAnnonce ? (
          annonces.map((annonce, key) => (
            <div key={annonce.id} className="w-1/3 p-4">
              <AnnonceCard annonce={annonce} setLoading={setLoading} />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ListeAnnonce;
