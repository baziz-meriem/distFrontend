import PageHeader from "@/components/shared/PageHeader";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";

const ListeClients = () => {
  useEffect(() => {
    if (!Data) {
      axios
        .get(
          "https://sitandlipapi.onrender.com/api/v1/profileManagement/client"
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            setData(res.data.data);
          }
        });
    }
  });

  const [Data, setData] = useState(null);
  const Tablehead = Data ? Object.keys(Data[0]).slice(1) : null;


  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-none">
        <PageHeader
          title="liste des Clients"
          description="Affiche la liste de tous les clients ainsi que leurs informations."
        />
      </div>
      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Clients" />
        {Data ? (
          <>
            <ListRow
              key={Tablehead[0]}
              data={Tablehead}
              numColumns="3"
              toAdd=""
              capitalize
            />
            {Data.map((rowData) => (
              <ListRow
                key={rowData.id}
                data={rowData}
                numColumns="3"
                toAdd="ADMs"
              />
            ))}
          </>
        ) : (
          <Loader/>
        )}
      </div>
    </div>
  );
};

export default ListeClients;
