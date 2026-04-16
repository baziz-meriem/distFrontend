import React, { useState, useRef, useEffect } from "react";
import PageHeader from "@/components/shared/PageHeader";
import BarChartMonth from "@/components/dashboard/BarChartAM1";
import BarChartYear from "@/components/dashboard/BarChartAM2";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AmSignlePage = ({ AM,distributeurs,pannesByMonth ,pannesByYear }) => {
  const router = useRouter();
  const { id } = router.query;
  const deleteAM = () => {
    axios
      .delete(
        `https://distbackend-96a5.onrender.com/api/v1/profileManagement/AM/${id}`
      )
      .then((res) => router.push("/listes/AM"));
  };
  const [amData, setAm] = useState(AM);
  const handleChange = (e) => {
    setAm({ ...amData, [e.target.name]: e.target.value });

  };

  let [Tablehead, setTableHead] = useState(
    distributeurs.length > 0
      ? Object.keys(distributeurs[0]).slice(1)
      : null
  );

  return (
    <div>
      <ToastContainer />
      <PageHeader
        title="AM Details"
        description="Detailed information for this maintenance agent"
      />
      <button
        className="block ml-auto  btn-red px-7 py-2.5 mt-6 light-grey relative"
        onClick={() => deleteAM()}
      >
        Delete AM
      </button>
      <div className="flex-auto pb-10  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <div className="w-full flex flex-wrap justify-between items-center">
          <div className="w-1/3 mx-10 border-b p-2  border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="type"
              value={amData.nom}
              onChange={(e) => handleChange(e)}
              name="nom"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Search..."
              value={amData.prenom}
              onChange={(e) => handleChange(e)}
              name="prenom"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Search..."
              value={amData.email}
              onChange={(e) => handleChange(e)}
              name="email"
            />
          </div>
          <div className="w-1/3 mx-10 border-b p-2 mt-2 border-solid border-grey">
            <input
              type="text"
              className="w-full px-0 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Search..."
              value={amData.numTel}
              onChange={(e) => handleChange(e)}
              name="numTel"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-2 w-full h-full">
  <div className="p-1 mt-6 w-1/2 h-80 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg">
    {pannesByMonth.length > 0 ? (
      <BarChartMonth data={pannesByMonth} />
    ) : (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">No pannes by month data yet</div>
      </div>
    )}
  </div>
  <div className="p-1 mt-6 w-1/2 h-80 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg">
    {pannesByYear.length > 0 ? (
      <BarChartYear data={pannesByYear} />
    ) : (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">No pannes by year data yet</div>
      </div>
    )}
  </div>
</div>

          <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Distributeurs" />
        {distributeurs.length > 0 ? (
            <>
            <ListRow
              key={Tablehead[0]}
              data={Tablehead}
              numColumns="5"
              toAdd=""
            />
            {distributeurs.map((rowData) => (   
                  <ListRow
                    key={rowData.id}
                    data={rowData}
                    toAdd={"nothing"}
                    numColumns="5"
                  />
              ))}
              </>
        ) : (
          <div className="text-center py-20">There is No data yet</div>
        )}
      </div>
      </div>

  );
};

export default AmSignlePage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const data = await fetch(
    `https://distbackend-96a5.onrender.com/api/v1/profileManagement/AM/${id}`
  );
  const AM = await data.json();


  let distributeurs = await fetch(
    `https://distbackend-96a5.onrender.com/api/v1/resourceManagement/distributeur/am/${id}`
  );
  distributeurs = await distributeurs.json();

  let pannesByYear = await fetch(
    `https://distbackend-96a5.onrender.com/api/v1/statistiques/years/${id}`
  );
  pannesByYear = await pannesByYear.json();

  const currentYear = new Date().getFullYear();
  let pannesByMonth = await fetch(
    `https://distbackend-96a5.onrender.com/api/v1/statistiques/months/${currentYear}/${id}`
  );
  pannesByMonth  = await pannesByMonth.json();
  return {
    props: { AM: AM.data , distributeurs: distributeurs.data,pannesByYear:pannesByYear.data,pannesByMonth:pannesByMonth.data},
  };
}