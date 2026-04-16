import CustomInput from "@/components/loginPage/CustomInput";
import PageHeader from "@/components/shared/PageHeader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import CustomSelect from "@/components/loginPage/CustomSelect";
import { useRouter } from "next/router";

const createADM = ({ clients }) => {
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
    prenom: "true",
    email: "sahbi@gmail.com",
    numTel: "1234567891",
    idClient: 1,
    password: "1234567891",
  });
  const handleSubmit = () => {
    axios
      .post(
        "https://distbackend-96a5.onrender.com/api/v1/profileManagement/adm",
        data
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("ADM Created Successfully!");
          router.push("/listes/ADM");
        } else {
          toast.error("Some errors occurred!");
        }
      });
  };
  const options = ["option1", "option2", "option3"];
  return (
    <div className="">
      <ToastContainer />
      <PageHeader
        title="Add ADM"
        description="Enter the agent's details"
      />
      <div className="h-full w-full relative flex flex-wrap py-10">
        <div className="w-1/2  mt-5 pr-5 py-3">
          <CustomInput
            label="Name"
            options={options}
            steFunction={setData}
            attr="nom"
            data={data}
            type="text"
          />
        </div>
        <div className="w-1/2  mt-5 pr-5 py-3">
          <CustomInput
            label="First name"
            options={options}
            steFunction={setData}
            attr="prenom"
            data={data}
            type="text"
          />
        </div>

        <div className="w-1/2  mt-5 pr-5 py-3">
          {" "}
          <CustomInput
            label="Email"
            options={options}
            steFunction={setData}
            attr="email"
            data={data}
            type="email"
          />
        </div>
        <div className="w-1/2 h-full mt-5 pr-5 py-3 ">
          <CustomSelect
            label="Client"
            options={clients}
            steFunction={setData}
            attr="idClient"
            data={data}
          />
        </div>
        <div className="w-1/2  mt-5 pr-5 py-3">
          <CustomInput
            label="Phone number"
            options={options}
            steFunction={setData}
            attr="numTel"
            data={data}
            type="number"
          />
        </div>
      </div>

   
      <button
        className="btn-green px-11 py-2.5 mt-4 light-grey block ml-auto"
        onClick={() => {
          handleSubmit();
        }}
      >
        Add ADM
      </button>
    </div>
  );
};

export default createADM;

export async function getServerSideProps() {
  // Get the clients
  let clients = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/profileManagement/client"
  );
  clients = await clients.json();

  return {
    props: { clients: clients.data },
  };
}
