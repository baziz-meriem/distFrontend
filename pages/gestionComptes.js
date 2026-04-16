import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/dashboard/Card";
const gestionComptes = ({ nbAM, nbAC, nbDecideurs }) => {
  return (
    <div>
      <PageHeader
        title="Account management"
        description="Manage sales agents, decision-makers, and maintenance staff."
      />
      <div className="py-10 gap-6">
        <Card
          title="Sales agents (AC)"
          color="creem-green"
          stats={nbAC}
          link="/listes/AC"
          addLink="/createAgent/createAC"
        />
        <Card
          title="Decision-makers (DE)"
          color="creem-green"
          stats={nbDecideurs}
          link="/listes/DE"
          addLink="/createAgent/createDE"
        />
        <Card
          title="Maintenance agents (AM)"
          color="creem-green"
          stats={nbAM}
          link="/listes/AM"
          addLink="/createAgent/createAM"
        />
      </div>
    </div>
  );
};

export default gestionComptes;

export async function getServerSideProps() {
  let AM = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/profileManagement/AM"
  );
  AM = await AM.json();

  let AC = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/profileManagement/AC"
  );
  AC = await AC.json();

  let decideurs = await fetch(
    "https://distbackend-96a5.onrender.com/api/v1/profileManagement/decideur"
  );
  decideurs = await decideurs.json();

  return {
    props: {
      nbAM: AM.data.length,
      nbAC: AC.data.length,
      nbDecideurs: decideurs.data.length,
    },
  };
}
