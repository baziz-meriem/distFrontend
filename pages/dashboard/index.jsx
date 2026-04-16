import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/dashboard/Card";
import BarChart from "@/components/dashboard/BarChart";
import LineChart from "@/components/dashboard/LineChart";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getClientsByMonth, getDistributeursByClient } from "@/services/stats";
import { getClient } from "@/services/clients";
import dayjs from "dayjs";
import axios from "axios";
import SpinLoader from "@/components/shared/SpinLoader";
import { apiUrl } from "@/config/config";

const DashboradMap = dynamic(
  () => import("@/components/dashboard/DashbardMap"),
  { ssr: false }
);

const API = apiUrl.url;

const Dashboard = () => {
  const [distributeur, setDistributeur] = useState([]);
  const [nbClient, setNbClient] = useState(null);
  const [nbADM, setNbADM] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [countsLoading, setCountsLoading] = useState(true);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    setLoggedInUser(userCookie ? JSON.parse(userCookie) : "");

    const fetchData = async () => {
      setCountsLoading(true);
      try {
        const [distributeurResponse, clientsResponse, ADMResponse] =
          await Promise.all([
            axios.get(`${API}/resourceManagement/distributeur`),
            axios.get(`${API}/profileManagement/client`),
            axios.get(`${API}/profileManagement/ADM`),
          ]);
        setDistributeur(distributeurResponse.data.data ?? []);
        const clients = clientsResponse.data.data ?? [];
        const adms = ADMResponse.data.data ?? [];
        setNbClient(clients.length);
        setNbADM(adms.length);
      } catch (error) {
        console.error(error);
        setNbClient(0);
        setNbADM(0);
      } finally {
        setCountsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [clients, setClients] = useState([]);
  const [distributeurs, setDistributeurs] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

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
    try {
      const { data: payload } = await getDistributeursByClient();
      const rows = payload?.data ?? [];
      const withClient = rows.filter((item) => item.idClient);
      const pairs = await Promise.all(
        withClient.map(async (item) => {
          const { data: clientInfo } = await getClient(item.idClient);
          return {
            name: clientInfo?.data?.nom ?? `Client ${item.idClient}`,
            count: item.distributeurs,
          };
        })
      );
      setClients(pairs.map((p) => p.name));
      setDistributeurs(pairs.map((p) => p.count));
    } catch (e) {
      console.error(e);
    }
  };

  const getClientsPerMonth = async () => {
    try {
      const { data: clientsMonth } = await getClientsByMonth();
      const list = clientsMonth?.data ?? [];
      const clientsNumber = list.map((item) => item.count);
      const months = list.map((item) => {
        const date = dayjs(item.month);
        return date.format("MMMM");
      });
      setData((prev) => ({
        ...prev,
        labels: months,
        values: clientsNumber,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatsLoading(true);
      await Promise.all([getClientStats(), getClientsPerMonth()]);
      if (!cancelled) setStatsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showBar =
    !statsLoading && distributeurs.length > 0 && clients.length > 0;
  const showLine =
    !statsLoading && data.values.length > 0 && data.labels.length > 0;

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
      <div className="grid w-full grid-cols-3 gap-x-4">
        {countsLoading ? (
          <div className="m-2 cursor-pointer rounded-lg bg-white bg-opacity-100 py-5 shadow-all drop-shadow-2xl">
            <SpinLoader />
          </div>
        ) : (
          <Card
            title="Distributors"
            stats={distributeur.length}
            link="/listes/Distributeurs/AC"
            addLink="/AddDistributeur"
          />
        )}
        {countsLoading ? (
          <div className="m-2 cursor-pointer rounded-lg bg-white bg-opacity-100 py-5 shadow-all drop-shadow-2xl">
            <SpinLoader />
          </div>
        ) : (
          <Card
            title="Clients"
            stats={nbClient}
            color="creem-green"
            link="/listes/Clients"
            addLink="/createAgent/createClient"
          />
        )}
        {countsLoading ? (
          <div className="m-2 cursor-pointer rounded-lg bg-white bg-opacity-100 py-5 shadow-all drop-shadow-2xl">
            <SpinLoader />
          </div>
        ) : (
          <Card
            title="ADMs"
            stats={nbADM}
            link="/listes/ADM"
            addLink="/createAgent/createADM"
          />
        )}
      </div>
      <div className="flex h-full w-full flex-row gap-x-6">
        <div className="h-full w-1/2">
          <div className="m-2 h-1/2 min-h-[280px] w-full rounded-lg bg-white bg-opacity-100 p-3 shadow-all drop-shadow-2xl">
            {statsLoading ? (
              <div className="flex h-64 items-center justify-center">
                <SpinLoader />
              </div>
            ) : showBar ? (
              <BarChart
                distributeurs={distributeurs}
                title="Distributors per client"
                clients={clients}
              />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-slate-50 px-4 text-center text-sm text-slate-600">
                Not enough data for this chart yet (needs at least one client
                with linked distributors).
              </div>
            )}
          </div>
          <div className="m-2 h-1/2 min-h-[280px] w-full rounded-lg bg-white bg-opacity-100 p-3 shadow-all drop-shadow-2xl">
            {statsLoading ? (
              <div className="flex h-64 items-center justify-center">
                <SpinLoader />
              </div>
            ) : showLine ? (
              <LineChart data={data} />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-slate-50 px-4 text-center text-sm text-slate-600">
                No monthly signup data yet.
              </div>
            )}
          </div>
        </div>
        <div className="m-2 h-full w-1/2 overflow-hidden rounded-lg bg-white bg-opacity-100 shadow-all drop-shadow-2xl">
          <DashboradMap distributeurs={distributeur} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
