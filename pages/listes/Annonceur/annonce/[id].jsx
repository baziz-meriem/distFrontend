import AnnoncePrice from "@/components/annonceur/AnnoncePriceSection";
import InfoAnnonce from "@/components/annonceur/infoCardAnnonce.";
import PageHeader from "@/components/shared/PageHeader";

const AnnoncePage = () => {
  return (
    <div>
      <PageHeader
        title="Ad details"
        description="Advertiser details"
      />
      <InfoAnnonce title="Ad details"/>
      <AnnoncePrice title='Set a price for your ad' />
    </div>
  );
};

export default AnnoncePage;
