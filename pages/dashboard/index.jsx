import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/dashboard/Card";
import BarChart from "@/components/dashboard/BarChart";
import LineChart from "@/components/dashboard/LineChart";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import authMiddleware from "@/middlewares/authMiddleware";
import { useEffect, useState } from "react";
import { getClientsByMonth, getDistributeursByClient } from "@/services/stats";
import { getClient } from "@/services/clients";
import dayjs from "dayjs";
const DashboradMap = dynamic(
  () => import("@/components/dashboard/DashbardMap"),
  { ssr: false }
);
import axios from "axios";
import SpinLoader from "@/components/shared/SpinLoader";

const Dashboard = () => {
  const [distributeur, setDistributeur] = useState([]);
  const [nbClient, setNbClient] = useState(null);
  const [nbADM, setNbADM] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const distributeurResponse = await axios.get(
          "https://distbackend-96a5.onrender.com/api/v1/resourceManagement/distributeur"
        );
        setDistributeur(distributeurResponse.data.data);

        const clientsResponse = await axios.get(
          "https://distbackend-96a5.onrender.com/api/v1/profileManagement/client"
        );
        console.log("clientsResponse", clientsResponse);
        setNbClient(clientsResponse.data.data.length);

        const ADMResponse = await axios.get(
          "https://distbackend-96a5.onrender.com/api/v1/profileManagement/ADM"
        );
        setNbADM(ADMResponse.data.data.length);

        // Assuming you have user information stored in cookies
        const userCookie = Cookies.get("user");
        setLoggedInUser(userCookie ? JSON.parse(userCookie) : "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [clients, setClients] = useState([]);
  const [distributeurs, setDistributeurs] = useState([]);

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
  const getClientStats = async () => {
    const { data } = await getDistributeursByClient();
    console.log(data);
    const allClients = [];
    const allDistributeurs = [];

    for (const item of data.data) {
      if (item.idClient) {
        const { data: clientInfo } = await getClient(item.idClient);
        allClients.push(clientInfo.data.nom);
        allDistributeurs.push(item.distributeurs);
      }
    }
    setClients(allClients);
    setDistributeurs(allDistributeurs);
  };

  const getClientsPerMonth = async () => {
    const { data: clientsMonth } = await getClientsByMonth();
    const clientsNumber = clientsMonth.data.map((item) => item.count);
    const months = clientsMonth.data.map((item) => {
      const date = dayjs(item.month);
      return date.format("MMMM");
    });
    setData({
      ...data,
      labels: months,
      values: clientsNumber,
    });
  };

  useEffect(() => {
    getClientStats();
    getClientsPerMonth();
  }, []);
  return (
    <div className="h-5/6 w-full">
      <PageHeader
        title="Dashboard"
        description={`Welcome${
          loggedInUser
            ? `, ${loggedInUser.name}. Signed in as ${loggedInUser.role}.`
            : ""
        }`}
      />
      <div className="grid grid-cols-3 gap-x-4 w-full ">
        {
          <Card
            title="Distributors"
            stats={distributeur.length}
            link="/listes/Distributeurs/AC"
            addLink="/AddDistributeur"
          />
        }
        {nbClient ? (
          <Card
            title="Clients"
            stats={nbClient}
            color="creem-green"
            link="/listes/Clients"
            addLink="/createAgent/createClient"
          />
        ) : (
          <div className="py-5 m-2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg cursor-pointer">
            <SpinLoader />
          </div>
        )}
        {nbADM ? (
          <Card
            title="ADMs"
            stats={nbADM}
            link="/listes/ADM"
            addLink="/createAgent/createADM"
          />
        ) : (
          <div className="py-5 m-2 bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg cursor-pointer">
            <SpinLoader />
          </div>
        )}
      </div>
      <div className=" flex flex-row gap-x-6 w-full h-full  ">
        <div className=" w-1/2 h-full">
          <div className="p-1 m-2 h-1/2 w-full  bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg ">
            {distributeurs.length > 0 && clients.length > 0 && (
              <BarChart
                distributeurs={distributeurs}
                title="New clients per month (by client)"
                clients={clients}
              />
            )}
          </div>
          <div className="p-1 m-2 h-1/2 w-full  bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg ">
            {data.values.length > 0 && data.labels.length > 0 && (
              <LineChart data={data} />
            )}
          </div>
        </div>
        <div className=" m-2 overflow-hidden bg-white bg-opacity-100 drop-shadow-2xl shadow-all rounded-lg w-1/2 h-full">
          <DashboradMap distributeurs={distributeur} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
