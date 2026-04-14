// React and related
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import PageHeader from "@/components/shared/PageHeader";
import CustomInput from "@/components/loginPage/CustomInput";
import CustomSelect from "@/components/loginPage/CustomSelect";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Services
import { saveProduitDistributeur, createnewProduit } from "@/services/produit";

const AddProduit = () => {
  const router = useRouter();

  const { id } = router.query;

  const [data, setData] = useState({
    label: null,
  });

  const [productData, setProductData] = useState({
    produitId: 1,
    distributeurId: 1,
    quantite: 50,
  });

  const [sectionOpen, setOpen] = useState(false);

  const [products, setProducts] = useState(null);

  useEffect(() => {
    setProductData({ ...productData, ["distributeurId"]: id });
  }, [id]);

  useEffect(() => {
    !products &&
      axios
        .get(
          "https://sitandlipapi.onrender.com/api/v1/resourceManagement/produit"
        )
        .then((res) => {
          setProducts(res.data.data);
        });
  });

  //function called when adding a new product to a specific distributeur
  const submitData = async () => {
    console.log("this is the data", {
      distributeurId: Number(productData.distributeurId),
      produitId: Number(productData.produitId),
      quantite: parseFloat(productData.quantite),
    });
    const newProduit = await saveProduitDistributeur(id, {
      distributeurId: Number(productData.distributeurId),
      produitId: Number(productData.produitId),
      quantite: parseFloat(productData.quantite),
    });
    if (newProduit.data.status === "success") {
      setProductData({});
      toast.success("Product added successfully");
      router.push("/listes/Distributeurs/AC/" + id);
    }
  };
  //function called when adding a new product
  const submitnewProductData = async () => {
    const newProduit = await createnewProduit(data);
    console.log(newProduit);

    if (newProduit.data.status === "success") {
      setData({});
      toast.success("Product created successfully");
      setProducts(null);
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <PageHeader
        title="Ajouter un produit"
        description="Donner les informations générales du produit"
      />
      <div className="h-full w-full relative overflow-y-hidden flex flex-row justify-center">
        <div className="w-1/2 m-4">
          <div className="flex justify-between">
            <p>Le produit est nouveau ? </p>
            <p className="cursor-pointer" onClick={() => setOpen(!sectionOpen)}>
              Crée le produit
            </p>
          </div>
          {sectionOpen ? (
            <div className="space-y-6 mt-8">
              <CustomInput
                label="Nom"
                steFunction={setData}
                attr="label"
                data={data}
                type="text"
              />

              <div className="flex justify-end">
                <button
                  className="btn-green px-11 py-2.5 mt-4 light-grey"
                  onClick={() => {
                    submitnewProductData();
                  }}
                >
                  Créer le produit
                </button>
              </div>
            </div>
          ) : null}

          <div className="space-y-6 mt-8">
            {products && (
              <CustomSelect
                label="selectionner un produit"
                options={products}
                steFunction={setProductData}
                attr="produitId"
                data={productData}
              />
            )}
            <CustomInput
              label="Quantité"
              steFunction={setProductData}
              attr="quantite"
              data={productData}
              type="number"
            />
            <div className="flex justify-end">
              <button
                className="btn-green px-11 py-2.5 mt-4 light-grey"
                onClick={() => {
                  submitData();
                }}
              >
                Ajouter le produit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduit;
