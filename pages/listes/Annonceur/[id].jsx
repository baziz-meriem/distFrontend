import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import AffectationCard from "@/components/details/affectationCard";
import InfoCard from "@/components/details/infoCard";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import InfoCardAnnoceur from "@/components/annonceur/InfoCardAnnoceur";
import CreateAnnonce from "@/components/annonceur/CreateAnnonce";
import ListeAnnonce from "@/components/annonceur/ListeAnnonce";
import Cookies from "js-cookie";

const annonceurPage = () => {
  const [loadingAnnonce, setLoading] = useState(true);
  
  return (
    <div>
      <PageHeader
        title="Annonceur Details"
        description="Affiche les informations de l'annonceur"
      />
      <button
        className="block ml-auto  btn-red px-7 py-2.5 mt-6 light-grey relative text-xs"
        onClick={() => deleteClient()}
      >
        Supprimer l'annonceur
      </button>
      <InfoCardAnnoceur title="Les information de lannonceur" />
      <CreateAnnonce setLoading={setLoading} />
      <ListeAnnonce loadingAnnonce={loadingAnnonce} setLoading={setLoading} />
    </div>
  );
};

export default annonceurPage;
