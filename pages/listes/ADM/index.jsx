import PageHeader from "@/components/shared/PageHeader";
import ListHeader from "@/components/lists/ListHeader";
import ListRow from "@/components/lists/ListRow";
import Link from "next/link";
import { useEffect, useState } from "react";
const ListAM = ({ AM }) => {
  useEffect(()=>{
console.log(AM)
  },[])
  let [Tablehead, setTableHead] = useState(
    AM.data.length > 0 ? Object.keys(AM.data[0]).slice(1) : null
  );

  if (!AM) return <div>Loding...</div>;
  return (
    <div>
      <div className="flex-none">
        <PageHeader
          title="ADMs"
          description="Lists all ADMs and their details."
        />
      </div>
      <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
        <ListHeader title="ADMS" />
        {AM.data.length > 0 ? (
          <>
            <ListRow
              key={Tablehead[0]}
              data={Tablehead}
              numColumns="5"
              toAdd=""
              capitalize
            />
            {AM.data.map((rowData) => (
              <Link href={`/listes/ADM/${rowData.id}`}>
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

export default ListAM;

export async function getServerSideProps() {
  const data = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/profileManagement/ADM"
  );
  const AM = await data.json();
  return { props: { AM } };
}
