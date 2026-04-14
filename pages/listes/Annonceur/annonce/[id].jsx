import AnnoncePrice from "@/components/annonceur/AnnoncePriceSection";
import InfoAnnonce from "@/components/annonceur/infoCardAnnonce.";
import PageHeader from "@/components/shared/PageHeader";

const AnnoncePage = () => {
  return (
    <div>
      <PageHeader
        title="Annonce Details"
        description="Affiche les informations de l'annonceur"
      />
      <InfoAnnonce title="Les informations de l'annonce"/>
      <AnnoncePrice title='Donner un prix pour votre annonce' />
    </div>
  );
};

export default AnnoncePage;
