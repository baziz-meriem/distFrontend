import CustomInput from "@/components/loginPage/CustomInput";
import React, { useState , useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const CreateAnnonceur = () => {
  const router = useRouter();

  const [loggedInUser, setUser] = useState(null);

  useEffect(() => {
    if (!loggedInUser) {
      const cookieValue = Cookies.get("user");
      if (cookieValue) {
        console.log(JSON.parse(cookieValue));
        setUser(JSON.parse(cookieValue));
        setData({ ...data, idClient: JSON.parse(cookieValue).idClient });
      }
    }
  });

  const [data, setData] = useState({
    nom: "true",
    idClient: 1,
    email: "",
    phoneNumber: "",
    Adr: "",
  });
  const handleSubmit = () => {
    console.log(data);
    axios
      .post("https://sitandlipapi.onrender.com/api/v1/annonce/annonceur", data)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log("annonceur inserted");
          toast.success("annonceur Created Succesfully!");
          router.push("/listes/Annonceur");
        } else {
          toast.error("Some errors occured!");
        }
      });
  };
  return (
    <div className="">
      <ToastContainer />

      <div className="h-full w-full relative overflow-y-hidden flex flex-row justify-end gap-4">
        <div className="space-y-10 mt-5">
          <CustomInput
            label="Nom"
            steFunction={setData}
            attr="nom"
            data={data}
            type="text"
          />
        </div>
        <div className="space-y-10 mt-5">
          <CustomInput
            label="Email"
            steFunction={setData}
            attr="email"
            data={data}
            type="text"
          />
        </div>
        <div className="space-y-10 mt-5">
          <CustomInput
            label="Num Tel"
            steFunction={setData}
            attr="phoneNumber"
            data={data}
            type="text"
          />
        </div>
        <div className="space-y-10 mt-5">
          <CustomInput
            label="Adresse"
            steFunction={setData}
            attr="Adr"
            data={data}
            type="text"
          />
        </div>
        <div>
          <button
            className="btn-border-green px-11 py-2.5 mt-5 light-grey"
            onClick={() => {
              handleSubmit();
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnonceur;
