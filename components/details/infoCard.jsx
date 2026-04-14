import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const infoCard = ({ title, id }) => {
  useEffect(() => {
    if (!clientData) {
      axios
        .get(`https://sitandlipapi.onrender.com/api/v1/profileManagement/client/${id}`)
        .then((res) => {
          setData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  });

  const handleChange = (e) => {
    setData({ ...clientData, [e.target.name]: e.target.value });
  };

  const updateClient = () => {
    axios
      .put(`https://sitandlipapi.onrender.com/api/v1/profileManagement/client/${id}`, {
        nom: clientData.nom,
        email: clientData.email,
        numTel: clientData.numTel,
      })
      .then((res) => {
        toast.success("Le client a été modifié");
      })
      .catch((err) => console.log(err));
  };

  const [clientData, setData] = useState(null);

  if (!clientData) return <div>Loding..</div>;
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
              value={clientData.nom}
              onChange={(e) => handleChange(e)}
              name="nom"
            />
          </div>

          <div className="border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full pl-2 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Chercher..."
              value={clientData.email}
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
              value={clientData.numTel}
              onChange={(e) => handleChange(e)}
              name="numTel"
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
export default infoCard;
