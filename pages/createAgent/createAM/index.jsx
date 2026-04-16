import CustomInput from "@/components/loginPage/CustomInput";
import PageHeader from "@/components/shared/PageHeader";
import React, { useState  , useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const createAM = () => {
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
    nom: null,
    prenom: null,
    mot_de_passe: "1234567891", // To generated
    email: null,
    numTel: null,
    idClient: 1, // will get it from the session
  });
  const handleSubmit = () => {
    console.log(data);
    axios
      .post(
        "https://distbackend-96a5.onrender.com/api/v1/profileManagement/am",
        data
      )
      .then((res) => {
        if (res.data.status === "success") {
          console.log("AM inserted");
          toast.success("AM Created Succesfully!");
          router.push('/listes/AM')
        } else {
          toast.error("Some errors occured!");
        }
      })
      .catch((err) => console.log(err));
  };
  const options = ["option1", "option2", "option3"];
  return (
    <div className="">
      <ToastContainer />
      <PageHeader
        title="Ajouter un Agent Maintenance"
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
              type="text"
            />

            <div className="flex justify-end">
              <button
                className="btn-green px-11 py-2.5 mt-4 light-grey"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Ajouter AM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default createAM;
