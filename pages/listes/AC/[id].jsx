import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import PageHeader from "@/components/shared/PageHeader";
import AffectationCard from "@/components/details/affectationCard";
import BoissonCard from "@/components/details/boissonCard";
import MapOverlay from "@/components/dashboard/MapOverlay";
import dynamic from "next/dynamic";
import DistributeurInfoCard from "@/components/details/DistributeurInfoCard";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AcSignlePage = ({ AC }) => {
  const router = useRouter();
  const { id } = router.query;
  const deleteAC = () => {
    axios
      .delete(
        `https://sitandlipapi.onrender.com/api/v1/profileManagement/AC/${id}`
      )
      .then((res) => router.push("/listes/AC"));
  };
  const [acData, setAc] = useState(AC);
  const handleChange = (e) => {
    setAc({ ...acData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ToastContainer />
      <PageHeader
        title="AC Details"
        description="Affiche les informations détaillées du AC"
      />
      <button
        className="block ml-auto  btn-red px-7 py-2.5 mt-6 light-grey relative"
        onClick={() => deleteAC()}
      >
        Supprimer AC
      </button>
      <div className="flex-auto pb-10  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <div className="w-full flex flex-wrap justify-between items-center">
          <div className="w-1/3 mx-10 border-b p-2  border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="type"
              value={acData.nom}
              onChange={(e) => handleChange(e)}
              name="nom"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={acData.prenom}
              onChange={(e) => handleChange(e)}
              name="prenom"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={acData.email}
              onChange={(e) => handleChange(e)}
              name="email"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={acData.numTel}
              onChange={(e) => handleChange(e)}
              name="numTel"
            />
          </div>
        </div>
        {/* <div className="flex justify-end">
          <button
            className="btn-green px-11 py-2.5 mt-6 light-grey relative"
            onClick={() => updateAC()}
          >
            Modifier
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AcSignlePage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const data = await fetch(
    `https://sitandlipapi.onrender.com/api/v1/profileManagement/AC/${id}`
  );
  const AC = await data.json();

  return {
    props: { AC: AC.data },
  };
}
