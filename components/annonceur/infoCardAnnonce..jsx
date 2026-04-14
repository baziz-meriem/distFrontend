import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const InfoAnnonce = ({ title }) => {
  const [annonceur, setannonceur] = useState(null);
  const [boisson, setBoisson] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!annonceData) {
      axios
        .get(`https://sitandlipapi.onrender.com/api/v1/annonce/annonce/${id}`)
        .then((res) => {
          setData(res.data.data);
          axios
            .get(
              `https://sitandlipapi.onrender.com/api/v1/annonce/annonceur/${res.data.data.idAnnonceur}`
            )
            .then((res) => {
              setannonceur(res.data.data);
            });
          //   axios
          //     .get(
          //       `https://sitandlipapi.onrender.com/api/v1/resourceManagement/boisson/2/${res.data.data.idBoisson}`
          //     )
          //     .then((res) => {
          //       console.log(res);
          //       setBoisson(res.data.data);
          //     });
        })
        .catch((err) => console.log(err));
    }
  });

  const handleChange = (e) => {
    setData({ ...annonceData, [e.target.name]: e.target.value });
  };

  const updateClient = () => {
    axios
      .put(`https://sitandlipapi.onrender.com/api/v1/annonce/annonceur/${id}`, {
        nom: annonceData.nom,
        idClient: annonceData.idClient,
      })
      .then((res) => {
        toast.success("L'annonceur a été modifié");
      })
      .catch((err) => console.log(err));
  };

  const displayDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const [annonceData, setData] = useState(null);

  if (!annonceData || !annonceur) return <div>Loding..</div>;

  return (
    <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
      <ToastContainer />
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <Image
            src="/icons/user-black.svg"
            width={30}
            height="30"
            alt="user icon"
          ></Image>
          <div className="text-xl font-medium tracking-1">{title}</div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex-wrap flex justify-between  mr-20 gap-2">
          <div className="p-2 mt-2 border-solid border-grey w-1/3">
            <label>Date debut</label>
            <input
              type="date"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none border bg-gray-200 shadow-md mt-2 rounded-md px-4 py-2"
              placeholder="Nom"
              value={displayDate(annonceData.DateDebut)}
              onChange={(e) => handleChange(e)}
              name="DateDebut"
            />
          </div>

          <div className=" p-2 mt-2 border-solid border-grey w-1/3">
            <label>Date Fin</label>
            <input
              type="date"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none border bg-gray-200 shadow-md mt-2 rounded-md px-4 py-2"
              placeholder="Chercher..."
              value={displayDate(annonceData.DateFin)}
              onChange={(e) => handleChange(e)}
              name="DateFin"
              
            />
          </div>
          <div className=" p-2 mt-2 border-solid border-grey w-1/3">
            <label>periode d'Affichage</label>
            <input
              type="text"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none border bg-gray-200 shadow-md mt-2 rounded-md px-4 py-2"
              placeholder="Chercher..."
              value={annonceData.periodeAffichage + " second"}
              onChange={(e) => handleChange(e)}
              name="periodeAffichage"
              
            />
          </div>
          <div className=" p-2 mt-2 border-solid border-grey w-1/3">
            <label>Annonceur</label>
            <input
              type="text"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none border bg-gray-200 shadow-md mt-2 rounded-md px-4 py-2"
              placeholder="Chercher..."
              value={annonceur.nom}
              onChange={(e) => handleChange(e)}
              name="idClient"
              disabled
            />
          </div>
          <div className=" p-2 mt-2 border-solid border-grey w-1/3">
            <label>Boisson</label>
            <input
              type="text"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none border bg-gray-200 shadow-md mt-2 rounded-md px-4 py-2"
              placeholder="Chercher..."
              value={annonceData.idBoisson}
              onChange={(e) => handleChange(e)}
              name="idClient"
              disabled
            />
          </div>
         
        </div>
        
      </div>
      <div className="rounded-lg overflow-hidden w-fit mt-5 mx-auto">
            <iframe
              width="720"
              height="380"
              src={annonceData.video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
    </div>
  );
};

export default InfoAnnonce;
