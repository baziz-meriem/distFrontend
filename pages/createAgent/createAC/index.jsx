import CustomInput from "@/components/loginPage/CustomInput";
import PageHeader from "@/components/shared/PageHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const createAC = () => {
  const router = useRouter();
  const [loggedInUser, setUser] = useState(null);
  useEffect(() => {
    if (!loggedInUser) {
      const cookieValue = Cookies.get("user");
      if (cookieValue) {
        console.log(JSON.parse(cookieValue))
        setUser(JSON.parse(cookieValue));
        setData({...data , "idClient" : JSON.parse(cookieValue).idClient})
      }
    }
  });
  const [data, setData] = useState({
    nom: "true",
    prenom: "true",
    email: "sahbi@gmail.com",
    numTel: "1234567891",
    idClient: 1,
    password: "1234567891",
  });
  const handleSubmit = () => {
    console.log(data);
    axios
      .post(
        "https://sitandlipapi.onrender.com/api/v1/profileManagement/ac",
        data
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log("AM inserted");
          toast.success("Ac Created Succesfully!");
          router.push("/listes/AC");
        } else {
          toast.error("Some errors occured!");
        }
      });
  };
  const options = ["option1", "option2", "option3"];
  return (
    <div className="">
      <ToastContainer />
      <PageHeader
        title="Ajouter un Agent Commerciale"
        description="Donner les informations générales de l'agent Commerciale"
      />
      <div className="h-full w-full relative overflow-y-hidden flex flex-row">
        <div className="w-1/2 m-4">
          <div className="space-y-10 mt-16">
            <CustomInput
              label="Nom"
              options={options}
              steFunction={setData}
              attr="nom"
              data={data}
              type="text"
            />

            <CustomInput
              label="Email"
              options={options}
              steFunction={setData}
              attr="email"
              data={data}
              type="email"
            />
          </div>
        </div>

        <div className="w-1/2 m-4">
          <div className="space-y-10 mt-16">
            <CustomInput
              label="Prénom"
              options={options}
              steFunction={setData}
              attr="prenom"
              data={data}
              type="text"
            />
            <CustomInput
              label="Numéro de télphone"
              options={options}
              steFunction={setData}
              attr="numTel"
              data={data}
              type="number"
            />

            <div className="flex justify-end">
              <button
                className="btn-green px-11 py-2.5 mt-4 light-grey"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Ajouter l'Agent Commerciale
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default createAC;
