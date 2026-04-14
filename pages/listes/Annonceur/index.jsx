import PageHeader from "@/components/shared/PageHeader";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreateAnnonceur from "@/components/annonceur/CreateAnnonceur";
import Cookies from "js-cookie";

const ListAnnonceur = () => {
  const router = useRouter();
  const [formIsOpen, setOpen] = useState(false);
  const [Tablehead, setTableHead] = useState(null);
  const [annonceurs, setAnnonceurs] = useState(null);
  const [ClientId, setClientId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieValue = Cookies.get("user");
        if (cookieValue) {
          setClientId(JSON.parse(cookieValue).idClient);
        }

        if (ClientId) {
          const data = await fetch(
            `https://sitandlipapi.onrender.com/api/v1/annonce/annonceur/client/${ClientId}`
          );
          const annonceursData = await data.json();
          setAnnonceurs(annonceursData);

          if (annonceursData?.data.length > 0) {
            setTableHead(Object.keys(annonceursData.data[0]).slice(1));
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ClientId]);

  if (!annonceurs) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex-none">
        <PageHeader
          title="Liste des annonceurs"
          description="Affiche la liste de tous les annonceurss ainsi que leurs informations."
        />
      </div>
      <button
        className="block ml-auto  btn-green px-7 py-2.5 mt-6 light-grey relative"
        onClick={() => setOpen(!formIsOpen)}
      >
        Ajouter un annonceur
      </button>
      {formIsOpen ? <CreateAnnonceur /> : <></>}
      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Clients" />
        {annonceurs.data.length > 0 ? (
          <>
            <ListRow
              key={Tablehead[0]}
              data={Tablehead}
              numColumns="5"
              toAdd=""
              capitalize
            />
            {annonceurs.data.map((rowData) => (
              <Link href={`/listes/Annonceur/${rowData.id}`}>
                <ListRow key={rowData.id} data={rowData} numColumns="5" />
              </Link>
            ))}
          </>
        ) : (
          <div className="text-center py-20">There is No data yet</div>
        )}
      </div>
    </div>
  );
};

export default ListAnnonceur;
