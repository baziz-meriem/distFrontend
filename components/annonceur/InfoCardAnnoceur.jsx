import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const InfoCardAnnoceur = ({ title }) => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!annonceurData) {
      axios
        .get(
          `https://distbackend-96a5.onrender.com/api/v1/annonce/annonceur/${id}`
        )
        .then((res) => {
          setData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  });

  const handleChange = (e) => {
    setData({ ...annonceurData, [e.target.name]: e.target.value });
  };

  const updateClient = () => {
    axios
      .put(
        `https://distbackend-96a5.onrender.com/api/v1/annonce/annonceur/${id}`,
        {
          nom: annonceurData.nom,
          email: annonceurData.email,
          phoneNumber: annonceurData.phoneNumber,
        }
      )
      .then((res) => {
        toast.success("Le client a été modifié");
      })
      .catch((err) => console.log(err));
  };

  const [annonceurData, setData] = useState(null);

  if (!annonceurData) return <div>Loding..</div>;
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
        <div className="flex-grow  mr-20">
          <div className="border-b p-2  border-solid border-grey">
            <input
              type="text"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Nom"
              value={annonceurData.nom}
              onChange={(e) => handleChange(e)}
              name="nom"
            />
          </div>

          <div className="border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={annonceurData.email}
              onChange={(e) => handleChange(e)}
              name="email"
            />
          </div>
        </div>

        <div className="flex-grow ml-20">
          <div className="border-b p-2 border-solid border-grey">
            <input
              type="text"
              className="w-full  pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={annonceurData.phoneNumber}
              onChange={(e) => handleChange(e)}
              name="numTel"
            />
          </div>
          <div className="border-b p-2 border-solid border-grey">
            <input
              type="text"
              className="w-full  pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={annonceurData.Adr}
              onChange={(e) => handleChange(e)}
              name="Adr"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="btn-green px-11 py-2.5 mt-6 light-grey relative"
          onClick={() => updateClient()}
        >
          Modifier
        </button>
      </div>
    </div>
  );
};

export default InfoCardAnnoceur;
