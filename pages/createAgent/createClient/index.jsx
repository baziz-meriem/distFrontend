import CustomInput from "@/components/loginPage/CustomInput";
import PageHeader from "@/components/shared/PageHeader";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const createClient = () => {
  const router = useRouter();
  
  const [data, setData] = useState({
    nom: null,
    email: null,
    numTel: null,
  });
  const handleSubmit = () => {
    console.log(data);
    axios
      .post(
        "https://sitandlipapi.onrender.com/api/v1/profileManagement/client",
        data
      )
      .then((res) => {
        console.log(res);
        router.push("/listes/Clients");
      });
  };
  const options = ["option1", "option2", "option3"];
  return (
    <div className="">
      <PageHeader
        title="Ajouter un Nouveau Client"
        description="Donner les informations générales du client"
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
              label="Numéro de télphone"
              options={options}
              steFunction={setData}
              attr="numTel"
              data={data}
              type="text"
            />

            <div className="flex justify-end">
              <button
                className="btn-green px-11 py-2.5 mt-4 light-grey"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Ajouter le Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default createClient;
