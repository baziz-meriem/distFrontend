import CustomSelect from "@/components/loginPage/CustomSelect";
import PageHeader from "@/components/shared/PageHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CustomInput from "@/components/loginPage/CustomInput";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const GetPosMap = dynamic(() => import("@/components/shared/GetPosMap"), {
  ssr: false,
});
const AddDistributeur = ({ clients, AMs, regions }) => {
  const router = useRouter();
  const [data, setData] = useState({
    idClient: null,
    type: null,
    idAM: null,
    etat: null,
    idRegion: null,
    position: null,
    codeDeverouillage: null,
  });

  // TODO: fix distributor types enum when API is finalized
  const DistributeurTypes = [
    { id: "type1", nom: "Type 1" },
    { id: "type2", nom: "Type 2" },
  ];
  const etat = [
    { id: "up", nom: "Up" },
    { id: "down", nom: "Down" },
  ];

  const submitData = () => {
    console.log("this is the data of the distributeur", data);
    axios
      .post(
        "https://distbackend-96a5.onrender.com/api/v1/resourceManagement/distributeur",
        data
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log("AM inserted");
          toast.success("Distributeur Created Successfully!");
          router.push("/listes/Distributeurs/AC");
        } else {
          toast.error("Some errors occurred!");
        }
      });
  };

  return (
    <div className="">
      <ToastContainer />
      <PageHeader
        title="Add distributor"
        description="Enter the distributor's details"
      />
      <div className="h-full w-full relative flex flex-row">
        <div className="w-1/2 m-4">
          <div className="space-y-10 mt-16">
            {/* <CustomSelect
              label="Client"
              options={clients}
              steFunction={setData}
              attr="idClient"
              data={data}
            /> */}
            <CustomSelect
              label="Type"
              options={DistributeurTypes}
              steFunction={setData}
              attr="type"
              data={data}
            />
            {/* <CustomInput
              label="Potion X,Y"
              options={clients}
              steFunction={setData}
              attr="position"
              data={data}
              type="text"
            /> */}
            {/* <CustomSelect
              label="Agent de Maintenance"
              options={AMs}
              steFunction={setData}
              attr="idAM"
              data={data}
            /> */}
            <CustomSelect
              label="Status"
              options={etat}
              steFunction={setData}
              attr="etat"
              data={data}
            />
            <CustomSelect
              label="Region"
              options={regions}
              steFunction={setData}
              attr="idRegion"
              data={data}
            />
          </div>
        </div>

        <div className="w-1/2 m-4">
          <div className="space-y-10 mt-16">
            <CustomInput
              label="Unlock code"
              options={clients}
              steFunction={setData}
              attr="codeDeverouillage"
              data={data}
              type="text"
            />
            <GetPosMap setData={setData} data={data} />

            <div className="flex justify-end">
              <button
                className="btn-green px-11 py-2.5 mt-4 light-grey"
                onClick={() => {
                  submitData();
                }}
              >
                Add distributor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDistributeur;

export async function getServerSideProps() {
  // Get the clients
  let clients = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/profileManagement/client"
  );
  clients = await clients.json();

  // get the AMs
  let AMs = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/profileManagement/am"
  );
  AMs = await AMs.json();

  // Get all the regions
  let regions = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/resourceManagement/region"
  );
  regions = await regions.json();
  console.log(regions);
  return {
    props: { clients: clients.data, AMs: AMs.data, regions: regions.data },
  };
}
