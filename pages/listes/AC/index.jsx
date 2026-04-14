import PageHeader from "@/components/shared/PageHeader";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import Link from "next/link";
import { useState } from "react";
const ListAC = ({AC}) => {
    let [Tablehead, setTableHead] = useState(
        AC.data.length > 0
          ? Object.keys(AC.data[0]).slice(1)
          : null
      );
    
      if (!AC) return <div>Loding...</div>;
  return (
    <div>
      <div className="flex-none">
        <PageHeader
          title="Liste des ACs"
          description="Affiche la liste de tous les ACs ainsi que leurs informations."
        />
      </div>
      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Clients" />
        {AC.data.length > 0 ? (
          <>
            <ListRow
              key={Tablehead[0]}
              data={Tablehead}
              numColumns="5"
              toAdd=""
              capitalize
            />
            {AC.data.map((rowData) => (
              <Link href={`/listes/AC/${rowData.id}`}>
                <ListRow
                  key={rowData.id}
                  data={rowData}
                  numColumns="5"
                />
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

export default ListAC;

export async function getServerSideProps() {
    const data = await fetch(
      "https://sitandlipapi.onrender.com/api/v1/profileManagement/AC"
    );
    const AC = await data.json();
    return { props: { AC } };
  }
