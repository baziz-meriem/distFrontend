// Components
import PageHeader from "@/components/shared/PageHeader";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";

// External libraries
import { useEffect, useState } from "react";
import Link from "next/link";

// Services
import { getAllDistributeur } from "@/services/distributeurs";

const ListeDistributeur = ({ distributeur }) => {
  let values =
    distributeur.data.length > 0
      ? Object.keys(distributeur.data[0]).slice(1)
      : null;
  values && values.splice(2, 1);
  let [Tablehead, setTableHead] = useState(values);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-none">
        <PageHeader
          title="Liste des Distributeurs"
          description="Affiche la liste de tous les Distributeurs ainsi que leurs informations."
        />
      </div>
      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Clients" />
        {distributeur.data.length > 0 ? (
          <>
            <ListRow
              key={Tablehead[0]}
              data={Tablehead}
              numColumns="7"
              toAdd=""
              capitalize
            />
            {distributeur.data.map((rowData) => (
              <Link href={`/listes/Distributeurs/AC/${rowData.id}`}>
                <ListRow key={rowData.id} data={rowData} numColumns="7" />
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
export async function getServerSideProps({ req }) {
  const user = req.cookies.user;
  console.log(user);
  const { data } = await getAllDistributeur(JSON.parse(user).idClient ,JSON.parse(user).role );

  return { props: { distributeur: data } };
}
export default ListeDistributeur;
