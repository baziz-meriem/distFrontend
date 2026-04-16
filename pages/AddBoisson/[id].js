// React and related
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Components
import PageHeader from "@/components/shared/PageHeader";
import CustomInput from "@/components/loginPage/CustomInput";
import CustomSelect from "@/components/loginPage/CustomSelect";
import CustomMultipleSelect from "@/components/loginPage/CustomMultipleSelect";

// Axios and related
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Services
import {
  getProduitsDistributeur,
  saveProduitBoisson,
} from "@/services/produit";
import { saveBoisson } from "@/services/boisson";

const AddBoisson = () => {
  const router = useRouter();

  const [drinkData, setDrink] = useState({
    label: null,
    description: null,
  });

  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    !drinks &&
      axios
        .get(
          "https://distbackend-96a5.onrender.com/api/v1/resourceManagement/boisson/"
        )
        .then((res) => {
          setDrinks(res.data.data);
        });
  }, [drinks]);

  const [data, setData] = useState({
    distributeurId: router.query.id,
    boissonId: null,
    prix: null,
    ingredients: [],
  });

  const [openSection, setOpen] = useState(false);

  const { id } = router.query;

  const [ingredients, setIngredients] = useState([]);
  const getDistributeurIngredients = async () => {
    const { data: produits } = await getProduitsDistributeur(id);

    const allIngredients = produits.data.map((item) => item.produit);
    setIngredients(allIngredients);
  };
  useEffect(() => {
    id && getDistributeurIngredients();
    setData({ ...data, distributeurId: id });
  }, [id]);

  const submitData = async () => {
    const newBoisson = await saveBoisson(data.distributeurId, data);
    console.log("🚀 ~ file: [id].js:46 ~ submitData ~ newBoisson:", newBoisson);
    if (newBoisson.data.status === "success") {
      console.log("done");
      data.ingredients.map(async (e, index) => {
        await saveProduitBoisson(newBoisson.data.data.idBoisson, e, {});
        if (index == data.ingredients.length - 1) {
          setData({});
          toast.success("Drink added successfully");
          router.push("/listes/Distributeurs/AC/" + id);
        }
      });
    }
  };

  const addNewDrink = async () => {
    axios
      .post(
        "https://distbackend-96a5.onrender.com/api/v1/resourceManagement/boisson",
        drinkData
      )
      .then((res) => {
        toast.success("Drink added successfully");
        setDrinks(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="">
      <ToastContainer />
      <PageHeader
        title="Add drink"
        description="Enter the drink's details"
      />

      <div className="h-full w-full relative overflow-y-hidden flex flex-row justify-center">
        <div className="w-1/2 m-4">
          <div>
            <div className="flex justify-between">
              <p>Is this a new drink? </p>
              <p
                className="cursor-pointer"
                onClick={() => setOpen(!openSection)}
              >
                Create drink
              </p>
            </div>
            {openSection ? (
              <div className="space-y-5 mt-8">
                <CustomInput
                  label="Drink name"
                  steFunction={setDrink}
                  attr="label"
                  data={drinkData}
                  type="text"
                />
                <CustomInput
                  label="Description"
                  steFunction={setDrink}
                  attr="description"
                  data={drinkData}
                  type="text"
                />
                <div className="flex justify-end">
                  <button
                    className="btn-green px-11 py-2.5 mt-4 light-grey"
                    onClick={() => {
                      addNewDrink();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="space-y-10 mt-16">
            {drinks && (
              <CustomSelect
                label="Select a drink"
                options={drinks}
                steFunction={setData}
                attr="boissonId"
                data={data}
              />
            )}

            <CustomInput
              label="Price"
              steFunction={setData}
              attr="prix"
              data={data}
              type="text"
            />
            <CustomMultipleSelect
              label="Ingredients"
              options={ingredients}
              steFunction={setData}
              attr="ingredients"
              data={data}
            />

            <div className="flex justify-end">
              <button
                className="btn-green px-11 py-2.5 mt-4 light-grey"
                onClick={() => {
                  submitData();
                }}
              >
                Add drink
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBoisson;
