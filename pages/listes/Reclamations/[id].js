// React imports
import React, { useState, useRef, useEffect } from "react";

// Next.js imports
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Component imports
import PageHeader from "@/components/shared/PageHeader";

// Service imports
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Link from "next/link";
import {
  deleteReclamation,
  deleteResponse,
  getAllResponses,
  getReclamation,
  getResponses,
} from "@/services/reclamationReponses";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import dayjs from "dayjs";

const Map = dynamic(() => import("@/components/dashboard/Map"), { ssr: false });

const ReclamationDetails = () => {
  const [reclamationData, setReclamationData] = useState({});
  const [responses, setResponses] = useState([]);
  const Tablehead = ["id", "date", "description"];
  const newOrder = ["", "id", "date", "description"];
  const router = useRouter();
  const { id } = router.query;
  const [showDetails, setshowDetails] = useState(false);

  // Effect to handle keydown events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "m" && !showDetails) {
        setshowDetails(true);
      } else if (event.key === "Escape" && showDetails) {
        setshowDetails(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDetails]);

  //function to retrieve the reclamation by id
  const fetchReclamation = async () => {
    const { data: reclamation } = await getReclamation(id);
    console.log("this is the data", reclamation.data);
    setReclamationData(reclamation.data);
  };
  //function to retrieve responses to the reclamation with id
  const fetchResponses = async () => {
    const { data: reponses } = await getAllResponses(id);
    const updatedArray = reponses.data.map((obj) => {
      return { ...obj, date: dayjs(obj.date).format("DD/MM/YYYY") };
    });
    const modifiedResponses = updatedArray.map((item) => {
      const newItem = {};
      newOrder.forEach((prop) => {
        newItem[prop] = item[prop];
      });
      return newItem;
    });
    setResponses(modifiedResponses);
  };

  useEffect(() => {
    id && fetchReclamation();
    id && fetchResponses();
  }, [id]);

  // Function to delete a reclamation by ID
  const deleteTheReclamation = async () => {
    if (responses.length > 0) {
      const deletedReponses = responses.map(async (item, index) => {
        await deleteResponse(item.id);
        index == responses.length - 1 &&
          (await deleteReclamation(id)) &&
          toast.success("recalmation deleted successfully") &&
          router.push("/listes/Reclamations");
      });
    } else {
      await deleteReclamation(id);
      toast.success("recalmation deleted successfully");
      router.push("/listes/Reclamations");
    }
  };

  const cancelPayment = () => {
    axios
      .get(
        `https://distbackend-96a5.onrender.com/api/v1/paymentManagement/payment/${reclamationData.idPayment}`
      )
      .then((res) => {
        axios
          .put(
            "https://distbackend-96a5.onrender.com/api/v1/paymentManagement/payment/cancel",
            { paymentIntentId: res.data.data.paymentIntentId }
          )
          .then((res) => {
            console.log(res.data);
            closeReclamation();
            toast.success("Payment canceled successfully");
          });
      });
  };

  const closeReclamation = () => {
    axios
      .put(
        `https://distbackend-96a5.onrender.com/api/v1/reclamation/reclamation/${reclamationData.id}`,
        {
          subject: reclamationData.subject,
          description: reclamationData.description,
          status: "treated",
        }
      )
      .then(() => {
        toast.success("reclamation marked as treated");
        router.push("/listes/Reclamations");
      });
  };
  return (
    <div>
      <ToastContainer />
      <ToastContainer />
      <PageHeader
        title="Reclamation Details"
        description="Affiche les informations détaillées de la reclamation"
      />
      {reclamationData.status != "treated" ? (
        <button
          className="block ml-auto  btn-border-green px-7 py-2.5 mt-6 light-grey relative"
          onClick={closeReclamation}
        >
          close reclamation
        </button>
      ) : (
        <div className="h-12"></div>
      )}
      <div className="p-10 pt-5 mt-6 shadow-all rounded-lg bg-transparent">
        <span
          className={`${
            reclamationData.status == "treated" ? "bg-green-500" : "bg-red-400"
          } mb-4 text-xs border text-white px-2 py-1 rounded-xl`}
        >
          {reclamationData.status}
        </span>{" "}
        <div className="flex justify-between mt-5">
          <div className="flex items-center">
            <Image
              src="/images/writing.png"
              width={23}
              height="25"
              alt="user icon"
            ></Image>
            <div className="text-xl font-medium flex justify-between w-full ml-1">
              <div>Reclamation {reclamationData.id} </div>
            </div>
          </div>
          <div>
            {reclamationData.status != "treated" && (
              <button
                className="block ml-auto  btn-green px-7 py-2.5  light-grey relative"
                onClick={() => {
                  cancelPayment();
                }}
              >
                Refund Payment
              </button>
            )}
          </div>
        </div>
        <div className="text-gray-500 mt-1">
          {" "}
          {reclamationData.description}{" "}
        </div>
      </div>

      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Reponses" />
        <ListRow key={Tablehead[0]} data={Tablehead} numColumns="3" />
        {responses.length > 0 &&
          responses.map((rowData) => (
            <ListRow
              key={rowData.id}
              data={rowData}
              numColumns="3"
              toAdd="response"
            />
          ))}
      </div>
    </div>
  );
};

export default ReclamationDetails;
