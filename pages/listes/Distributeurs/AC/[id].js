// React imports
import React, { useState, useEffect } from "react";

// Next.js imports
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Component imports
import PageHeader from "@/components/shared/PageHeader";
import AffectationCard from "@/components/details/affectationCard";
import BoissonCard from "@/components/details/boissonCard";
import ProductCaroussel from "@/components/details/ProductCaroussel";
import MapOverlay from "@/components/dashboard/MapOverlay";
import DistributeurInfoCard from "@/components/details/DistributeurInfoCard";

// Service imports
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getBoissons } from "@/services/boisson";
import { getProduitsDistributeur } from "@/services/produit";

import Link from "next/link";
import { getAM } from "@/services/amService";
import AmCard from "@/components/details/AmCard";
import { getDistributeurById } from "@/services/distributeurs";

const Map = dynamic(() => import("@/components/dashboard/Map"), { ssr: false });
const DistributeursAC = () => {
  // State and router hooks
  const [boissonData, setData] = useState(null);
  const [amData, setAmData] = useState({});
  const [produits,setProduits] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [showDetails, setshowDetails] = useState(false);

  // Effect to handle keydown events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "m" && !showDetails) {
        setshowDetails(true);
      } else if (event.key === "Escape" && showDetails) {
        setshowDetails(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDetails]);
  // get AM
  const getAm = async (id) => {
    const {data:distributeur}= await getDistributeurById(id)
    const { data } = await getAM(distributeur.data.idAM);
    console.log(data.data)
    setAmData(data.data)
  };
  // get all drinks
  const getAllBoissons = async () => {
    const { data } = await getBoissons(id);
    const result = data.data.map(({ boisson, prix }) => ({
      label: boisson.label,
      prix,
    }));
    setData(result);
  };
  //get all products of a distributor
  const getAllProducts = async () => {
    const { data: products } = await getProduitsDistributeur(id);
    const filteredProducts = products.data.map((e) => e.produit);

    // Modify the products with different images based on the label
    const modifiedProducts = filteredProducts.map((product) => {
      let image = "/images/coffee.png"; // Default image path

      if (product.label === "sugar") {
        image = "/images/sugar.png"; // Set different image for label "sugar"
      } else if (product.label === "milk") {
        image = "/images/milk.png"; // Set different image for label "milk"
      } else if (product.label === "coffee") {
        image = "/images/coffee.png"; // Set different image for label "coffee"
      } else if (product.label === "chocolate") {
        image = "/images/chocolate.png"; // Set different image for label "chocolate"
      } else if (product.label === "mint") {
        image = "/images/mint.png"; 
      } else if (product.label === "water") {
        image = "/images/water.jpg";
      }

      return {
        ...product,
        image: image,
      };
    });

    setProduits(modifiedProducts);
  };

  useEffect(() => {
    !boissonData && id && getAllBoissons();
    id && getAllProducts();
    id && getAm(id);

  }, [id]);



  return (
    <div>
      <ToastContainer />
      <PageHeader
        title="Distributeur Details"
        description="Affiche les informations détaillées du distributeur"
      />

      <DistributeurInfoCard title="Distributeur Infos" id={id} />
      <div className="flex gap-4 h-40">
        <AmCard am={amData} title="AM du distributeur" />
        
        <div className=" w-1/2  mt-6 shadow-all rounded-lg bg-transparent overflow-hidden">
          {showDetails ? <MapOverlay /> : <Map />}
        </div>
      </div>
      <div className=" mt-6 shadow-all py-6 rounded-lg bg-transparent">
        <div className="flex pl-4 items-center">
          <Image
            src="/icons/user-black.svg"
            width={30}
            height={30}
            alt="user icon"
          />
        </div>

        <div className="flex items-center mt-6">
          <div className="text-xl px-16 font-medium flex justify-between w-full">
            <div>Les Produits</div>
            <div>
              <Link href={`/AddProduit/${id}`}>
                <button className="btn-green block ml-auto text-sm">
                  Ajouter un Produit
                </button>
              </Link>
            </div>
          </div>
        </div>
        <ProductCaroussel cards={produits} />
      </div>
      <div className="p-10 mt-6 shadow-all rounded-lg bg-transparent">
        <div className="flex items-center">
          <Image
            src="/icons/user-black.svg"
            width={30}
            height={30}
            alt="user icon"
          />
          <div className="text-xl font-medium flex justify-between w-full">
            <div>Les Boissons</div>
            <div>
              <button className="btn-green block ml-auto text-sm">
                <Link href={`/AddBoisson/${id}`}>Ajouter une Boisson</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="text-gray-500 mt-1">
          Liste de toutes les boissons que le distributeur peut préparer
        </div>
        <div className="grid grid-cols-3 gap-16">
          {boissonData &&
            boissonData.map((rowData, key) => (
              <BoissonCard key={rowData.id} data={rowData} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DistributeursAC;
