import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/dashboard/Card";
import BarChart1 from "@/components/dashboard/BarChart1";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import authMiddleware from "@/middlewares/authMiddleware";
import { useEffect, useState } from "react";
import { getClientsByMonth, getDistributeursByClient } from "@/services/stats";
import { getClient } from "@/services/clients";
import dayjs from "dayjs";
import BarChart2 from "@/components/dashboard/BarChart2";
import BarChart5 from "@/components/dashboard/BarChart5";
import BarChart3 from "@/components/dashboard/BarChart3";
import BarChart4 from "@/components/dashboard/BarChart4";
import BarChart6 from "@/components/dashboard/BarChart6";

import axios from "axios";

const Statistics = ({ loggedInUser }) => {
  const [data, setData] = useState({
    title: "",
    labels: [],
    values: [],
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#48CAE4",
      "#ADFF2F",
      "#FF7F50",
    ],
  });

  const [statsData, setStats] = useState(null);

  const getRegions = (data) => {
    let regions = [];
    data
      ? data.map((elem) => {
          regions.push(elem.nom);
        })
      : (regions = []);

    return regions;
  };

  const getUseAvg = (data) => {
    let avgs = [];
    data
      ? data.map((elem) => {
          avgs.push(elem.NbCmdsPerDistr);
        })
      : (avgs = []);

    return avgs;
  };

  const getNbCmd = (data) => {
    let nbCmd = [];
    data
      ? data.map((elem) => {
          nbCmd.push(elem.NbCmdsRegion);
        })
      : (nbCmd = []);

    return nbCmd;
  };

  const dateFilters = [
    {
      id: 0,
      label: "Last Week",
      dateDebut: "2023-5-12",
      dateFin: "2023-6-17",
    },
    {
      id: 1,
      label: "Last Month",
      dateDebut: "2023-4-12",
      dateFin: "2023-6-17",
    },
    {
      id: 2,
      label: "Last Year",
      dateDebut: "2022-12-12",
      dateFin: "2023-12-12",
    },
  ];

  const [selectedPeriod, setPeriod] = useState(dateFilters[0]);

  const [revenuData, setRevenue] = useState(null);

  const [drinkRevenuData, setDrinkRevenue] = useState(null);

  const [regionRevenuData, setRegionRevenue] = useState(null);

  // todo change the clientId
  useEffect(() => {
    if (loggedInUser) {
      !statsData &&
        axios
          .get(
            `https://distbackend-96a5.onrender.com/api/v1/statistiques/satatUse/tauxUseByRegionsClient/${
              JSON.parse(loggedInUser).idClient
            }/${selectedPeriod.dateDebut}/${selectedPeriod.dateFin}`
          )
          .then((res) => {
            console.log("this is the data", res.data.data);
            setStats(res.data.data);
          });

      !revenuData &&
        axios
          .get(
            `https://distbackend-96a5.onrender.com/api/v1/statistiques/revenue/distributeur/client/${
              JSON.parse(loggedInUser).idClient
            }`
          )
          .then((res) => setRevenue(res.data.data));
      !drinkRevenuData &&
        axios
          .get(
            `https://distbackend-96a5.onrender.com/api/v1/statistiques/revenue/${
              JSON.parse(loggedInUser).idClient
            }/boisson`
          )
          .then((res) => setDrinkRevenue(res.data.data));
      !regionRevenuData &&
        axios
          .get(
            `https://distbackend-96a5.onrender.com/api/v1/statistiques/revenue/region/client/${
              JSON.parse(loggedInUser).idClient
            }/`
          )
          .then((res) => setRegionRevenue(res.data.data));
    }
  }, [statsData, loggedInUser]);

  return (
    <div className="h-full w-full">
      <PageHeader
        title="Statistics"
        description={`Welcome${
          loggedInUser
            ? `, ${JSON.parse(loggedInUser).name}. Signed in as ${JSON.parse(loggedInUser).role}.`
            : ""
        }`}
      />

      <div className="py-4 text-xl font-semibold">Overview</div>

      <div className="w-fit mx-auto mb-8">
        {dateFilters.map((period) => (
          <button
            className={`border rounded-md mx-2 px-4 py-2 ${
              period.label == selectedPeriod.label
                ? "bg-light-green text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setPeriod(period);
              setStats(null);
            }}
          >
            {period.label}
          </button>
        ))}
      </div>

      <div className="gap-x-6 w-full h-auto mb-10 ">
        <div className="flex w-full h-1/2">
          <div className=" m-2 h-auto w-1/2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg">
            <BarChart1
              labels={getRegions(statsData)}
              data={getUseAvg(statsData)}
            />
          </div>
          <div className="m-2 h-auto w-1/2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg">
            <BarChart2
              labels={getRegions(statsData)}
              data={getNbCmd(statsData)}
            />
          </div>
        </div>
        <div className="flex w-full h-1/2">
          <div className=" m-2  w-1/2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg ">
            <BarChart3 labels={getRegions(statsData)} data={statsData} />
          </div>
          <div className=" m-2 h-auto w-1/2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg">
            <BarChart4 />
          </div>
        </div>
      </div>
      <hr />
      <div className="py-4 text-xl font-semibold">
        Revenue statistics{" "}
      </div>

      <div className="flex w-full h-1/2">
        <div className=" m-2  w-1/2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg ">
          <BarChart5 data={revenuData} />
        </div>
        <div className=" m-2  w-1/2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg ">
          <BarChart6
            data={drinkRevenuData}
            title="Revenue by drink"
            color="120,12,160"
          />
        </div>
      </div>
      <div className="pb-20">
        <div className=" m-2 mb-10 w-1/2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg ">
          <BarChart6
            data={regionRevenuData}
            title="Revenue by region"
            color="12,120,160"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      loggedInUser: req.cookies.user ? req.cookies.user : "",
    },
  };
}
