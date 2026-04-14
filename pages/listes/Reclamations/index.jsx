import { React, useState, useEffect, useRef } from "react";
import PageHeader from "@/components/shared/PageHeader";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import Popup from "@/components/lists/Popup";
import { getReclamations, saveResponse } from "@/services/reclamationReponses";
import dayjs from "dayjs";
import AddResponsePopup from "@/components/lists/AddResponsePopup";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const Reclamations = () => {
  // router
  const router = useRouter();
  // state
  const [Data, setData] = useState([]);
  const Tablehead = ["id", "idPayment", "date", "description", "status"];
  const newOrder = ["", "id", "idPayment", "date", "description", "status"];
  const [showPopup, setShowPopup] = useState(false);

  const [rowData, setRowData] = useState({
    idPayment: null,
  });
  const [reponseData, setReponseData] = useState({
    description: null,
  });

  const addResponse = async () => {
    const { data: res } = await saveResponse({
      idReclamation: rowData.id,
      description: reponseData.description,
    });
    console.log(res);
    if (res.status === "OK") {
      toast.success(res.message);
      router.push(`/listes/Reclamations/${rowData.id}`);
    } else toast.error("reply not added");
    setShowPopup(false);
  };
  const handleOpenPopup = (data) => {
    setShowPopup(true);
    setRowData(data);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const fetchReclamations = async () => {
    const { data: reclamations } = await getReclamations();
    const updatedArray = reclamations.data.map((obj) => {
      return { ...obj, date: dayjs(obj.date).format("DD/MM/YYYY") };
    });
    const modifiedReclamations = updatedArray.map((item) => {
      const newItem = {};
      newOrder.forEach((prop) => {
        newItem[prop] = item[prop];
      });
      return newItem;
    });
    setData(modifiedReclamations);
  };
  useEffect(() => {
    fetchReclamations();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      <ToastContainer />
      {showPopup && (
        <AddResponsePopup
          data={reponseData}
          setData={setReponseData}
          closePopup={handleClosePopup}
          addResponse={addResponse}
          reclamationData = {rowData}
        />
      )}

      <div className="flex-none">
        <PageHeader
          title="Liste des Réclamations"
          description="Affiche la liste de toutes les Réclamations reçues."
        />
      </div>
      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Réclamations" />
        <ListRow key={Tablehead[0]} data={Tablehead} numColumns="5" toAdd=""  capitalize/>
        {Data.map((rowData) => (
          <ListRow
            key={rowData.id}
            data={rowData}
            numColumns="5"
            toAdd="response"
            onRowClick={() => {
              handleOpenPopup(rowData);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Reclamations;
