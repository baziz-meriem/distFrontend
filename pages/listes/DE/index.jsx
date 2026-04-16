import PageHeader from "@/components/shared/PageHeader";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import Link from "next/link";
import { useState } from "react";
const ListDE = ({DE}) => {
    let [Tablehead, setTableHead] = useState(
        DE.data.length > 0
          ? Object.keys(DE.data[0]).slice(1)
          : null
      );
    
      if (!DE) return <div>Loding...</div>;
  return (
    <div>
      <div className="flex-none">
        <PageHeader
          title="Decision-makers"
          description="Lists all decision-makers and their details."
        />
      </div>
      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="Clients" />
        {DE.data.length > 0 ? (
          <>
            <ListRow
              key={Tablehead[0]}
              data={Tablehead}
              numColumns="5"
              toAdd=""
              capitalize
            />
            {DE.data.map((rowData) => (
              <Link href={`/listes/DE/${rowData.id}`}>
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

export default ListDE;

export async function getServerSideProps() {
    const data = await fetch(
      "https://distbackend-96a5.onrender.com/api/v1/profileManagement/decideur"
    );
    const DE = await data.json();
    return { props: { DE } };
  }
