import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import CustomInput from "../loginPage/CustomInput";
import CustomSelect from "../loginPage/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AnnoncePrice = ({ title }) => {
  const router = useRouter();
  const { id } = router.query;
  const [region, setRegion] = useState(null);
  const [prices, setPrices] = useState(null);
  const [data, setData] = useState({
    idRegion: 0,
    idAnnonce: id,
    PrixAnnonce: 0,
    TypePayment: "Par Vue",
    NbVues: 0,
  });

  useEffect(() => {
    // get regions
    if (!region) {
      axios
        .get(
          "https://distbackend-96a5.onrender.com/api/v1/resourceManagement/region"
        )
        .then((res) => {
          setRegion(res.data.data);
        })
        .catch((err) => console.log(err));
    }

    if (!prices && id) {
      axios
        .get(
          `https://distbackend-96a5.onrender.com/api/v1/annonce/annonceRegion/${id}`
        )
        .then((res) => {
          setPrices(res.data.data);
          console.log(
            "🚀 ~ file: AnnoncePriceSection.jsx:43 ~ .then ~ res.data.data:",
            res.data.data
          );
        })
        .catch((err) => console.log(err));
    }
  });

  const handleChange = (e) => {
    setData({ ...region, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    id && setData({ ...data, idAnnonce: id });
  }, [id, prices]);

  const addPrice = () => {
    console.log("this is the data", data);
    axios
      .post("https://distbackend-96a5.onrender.com/api/v1/annonce/annonceRegion", {
        ...data,
        PrixAnnonce: Number(data.PrixAnnonce),
      })
      .then((data) => {
        toast.success("Price Added Successfuly "), setPrices(null);
      })
      .catch((err) => toast.error("Price on this region already exists"));
  };

  const deletePrice = (price) => {
    axios
      .delete(
        `https://distbackend-96a5.onrender.com/api/v1/annonce/annonceRegion/${price.idAnnonce}/${price.idRegion}`
      )
      .then((data) => {
        toast.error("Price deleted Successfuly "), setPrices(null);
      });
  };

  if (!region || !prices) return <div>Loding..</div>;

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
      {prices.map((price) => (
        <div className="border rounded-md px-4 py-2 flex my-2 justify-between bg-green-100">
          <div className="w-1/2">
            {region.map(
              (region) =>
                region.id === price.idRegion && <p>Region: {region.nom}</p>
            )}
          </div>

          <div className="w-1/3">Type de Payment: {price.TypePayment} </div>
          <div className="w-1/3">Nombre de vue: {price.NbVues}</div>
          <div className="w-1/3"> Prix: {price.PrixAnnonce} DA</div>
          <div className="cursor-pointer" onClick={() => deletePrice(price)}>
            <FontAwesomeIcon
              icon={faTrash}
              color="red"
              className="text-sm"
              width="15"
            />
          </div>
        </div>
      ))}
      <div className="w-full items-center">
        <div className=" flex justify-between  mr-20 gap-2">
          <div className="p-2 mt-2 border-solid border-grey w-1/3">
            <CustomSelect
              label="Region"
              options={region}
              steFunction={setData}
              attr="idRegion"
              data={data}
            />
          </div>
          <div className="p-2 mt-2 border-solid border-grey w-1/3">
            <CustomSelect
              label="Type de payment"
              options={[
                { nom: "par vue", id: "par vue" },
                { nom: "par periode", id: "par periode" },
              ]}
              steFunction={setData}
              attr="TypePayment"
              data={data}
            />
          </div>

          <div className=" p-2 mt-2 border-solid border-grey w-1/3">
            <CustomInput
              label={
                data.TypePayment == "par vue"
                  ? "Prix unitaire"
                  : "Prix d'affichage"
              }
              steFunction={setData}
              attr="PrixAnnonce"
              data={data}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="btn-green px-11 py-2.5 mt-6 light-grey relative"
          onClick={() => addPrice()}
        >
          Ajouter{" "}
        </button>
      </div>
    </div>
  );
};

export default AnnoncePrice;
