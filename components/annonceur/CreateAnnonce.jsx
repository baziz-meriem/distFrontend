import CustomInput from "@/components/loginPage/CustomInput";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/router";
import CustomSelect from "../loginPage/CustomSelect";

const CreateAnnonce = ({ setLoading }) => {
  const router = useRouter();
  const { id } = router.query;
  // state
  const [isShowed, setShow] = useState(false);
  const [annonceData, setData] = useState({
    video: "string",
    periodeAffichage: "50",
    DateDebut: "",
    DateFin: "",
    idBoisson: 1,
    idAnnonceur: "string",
  });
  const [regions, setRegions] = useState(null);

  // Get Data
  const getRegion = () => {
    axios
      .get("https://distbackend-96a5.onrender.com/api/v1/resourceManagement/region")
      .then((data) => {
        setRegions(data.data.data);
      });
  };

  // Hooks
  useEffect(() => {
    id && setData({ ...annonceData, idAnnonceur: id });

    !regions && getRegion();
  }, [id]);

  // functions
  const addAnnonce = () => {
    console.log(annonceData);

    prixAnnonce: Number(annonceData.prixAnnonce),
      axios
        .post("https://distbackend-96a5.onrender.com/api/v1/annonce/annonce", {
          ...annonceData,
          prixAnnonce: Number(annonceData.prixAnnonce),
          DateDebut: new Date(
            `${annonceData.DateDebut}T12:30:00.000Z`
          ).toISOString(),
          DateFin: new Date(
            `${annonceData.DateFin}T12:30:00.000Z`
          ).toISOString(),
        })
        .then(() => {
          toast.success("Annonce Added ");
          setLoading(true);
        });
  };
  return (
    <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
      <ToastContainer />

      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            src="/icons/user-black.svg"
            width={30}
            height="30"
            alt="user icon"
          ></Image>
          <div className="text-xl font-medium tracking-1">
            Ajouter une annonce
          </div>
        </div>
        <button
          className="btn-green px-4 py-2.5  light-grey relative rounded-full font-bold"
          onClick={() => setShow(!isShowed)}
        >
          {isShowed ? "--" : "+"}
        </button>
      </div>

      {isShowed ? (
        <div className="w-9/12 mx-auto">
          {" "}
          <div className="flex gap-4  pt-4 flex-wrap justify-between ">
            <div className="w-5/12 ">
              <label> Video</label>
              <CustomInput
                label="Video"
                steFunction={setData}
                attr="video"
                data={annonceData}
                type="text"
              />
            </div>
            <div className="w-5/12 ">
              <label> Date Debut</label>
              <CustomInput
                label="Date debut"
                steFunction={setData}
                attr="DateDebut"
                data={annonceData}
                type="date"
              />
            </div>
            <div className="w-5/12 ">
              <label> Date Fin</label>
              <CustomInput
                label="Date debut"
                steFunction={setData}
                attr="DateFin"
                data={annonceData}
                type="date"
              />
            </div>
            <div className="w-5/12 ">
              <label>Les categories</label>
              <CustomInput
                label="cat1 , cat2 ..."
                steFunction={setData}
                attr="categ"
                data={annonceData}
                type="text"
              />
            </div>
            <div className="w-5/12 ">
              <label>Duré d'affichage</label>
              <CustomInput
                label="Duré d'affichage"
                steFunction={setData}
                attr="periodeAffichage"
                data={annonceData}
                type="text"
              />
            </div>
          </div>
          <div>
            <button
              className="btn-green px-11 py-2.5 mt-3 block ml-auto light-grey relative"
              onClick={() => addAnnonce()}
            >
              Ajouter
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateAnnonce;
