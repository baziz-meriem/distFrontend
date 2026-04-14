import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AcSignlePage = ({ ADM }) => {
  const router = useRouter();
  const { id } = router.query;
  const deleteAC = () => {
    axios
      .delete(
        `https://sitandlipapi.onrender.com/api/v1/profileManagement/ADM/${id}`
      )
      .then((res) => router.push("/listes/ADM"));
  };
  const [admData, setAc] = useState(ADM);
  const handleChange = (e) => {
    setAc({ ...admData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ToastContainer />
      <PageHeader
        title="ADM Details"
        description="Affiche les informations détaillées du ADM"
      />
      <button
        className="block ml-auto  btn-red px-7 py-2.5 mt-6 light-grey relative"
        onClick={() => deleteAC()}
      >
        Supprimer ADM
      </button>
      <div className="flex-auto pb-10  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <div className="w-full flex flex-wrap justify-between items-center">
          <div className="w-1/3 mx-10 border-b p-2  border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="type"
              value={admData.nom}
              onChange={(e) => handleChange(e)}
              name="nom"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={admData.prenom}
              onChange={(e) => handleChange(e)}
              name="prenom"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={admData.email}
              onChange={(e) => handleChange(e)}
              name="email"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={admData.numTel}
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
    `https://sitandlipapi.onrender.com/api/v1/profileManagement/ADM/${id}`
  );
  const ADM = await data.json();

  return {
    props: { ADM: ADM.data },
  };
}