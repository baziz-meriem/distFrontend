import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowRight,
  faStop,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const AnnonceCard = ({ annonce, setLoading }) => {
  //** hooks  */
  const router = useRouter();

  // ** state
  const [status, setStatus] = useState(true);

  const deleteAnnonce = () => {
    axios
      .delete(
        `https://sitandlipapi.onrender.com/api/v1/annonce/annonce/${annonce.id}`
      )
      .then(() => {
        toast.success("annonce deleted");
        setLoading(true);
      })
      .catch((err) =>
        toast.error("Can not delete annonce, annonce has some references ")
      );
  };
  return (
    <div className="border rounded-lg overflow-hidden w-fit bg-transparant shadow-md p-2 border-gray-300">
      <ToastContainer />
      <div className="rounded-lg overflow-hidden w-fit">
        <iframe
          width="320"
          height="180"
          src={annonce.video}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className="flex flex-wrap gap-2 my-4"></div>

      <div className="flex justify-end gap-4">
        <button
          className="btn-red px-2 py-2 mb-2 light-grey relative text-xs bg-transparent text-red-500 border border-red-500"
          onClick={() => deleteAnnonce()}
        >
          <FontAwesomeIcon
            icon={faTrash}
            color="red"
            className="text-sm"
            width="15"
          />
        </button>
        <button
          className={`btn-red px-2 py-2 mb-2 block  light-grey relative text-xs bg-transparent ${
            status
              ? "text-red-500 border border-red-500"
              : "text-green-500 border border-green-500"
          } `}
          onClick={() => setStatus(!status)}
        >
          <FontAwesomeIcon
            icon={status ? faStop : faPlay}
            color={status ? "red" : "green"}
            className="text-sm"
            width="15"
          />
        </button>
        <button
          className="btn-red px-2 py-2 mb-2 block  light-grey relative text-xs bg-transparent text-gray-500 border border-gray-500"
          onClick={() => router.push("/listes/Annonceur/annonce/" + annonce.id)}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            color="gray"
            className="text-sm"
            width="15"
          />
        </button>
      </div>
    </div>
  );
};

export default AnnonceCard;
