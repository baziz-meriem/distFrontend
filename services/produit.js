import http from "./httpService";
import { apiUrl } from "../config/config";
const endpoint = apiUrl.url + "/resourceManagement/produit";

export const getProduits = () => {
  return http.get(endpoint);
};

export const getProduitsDistributeur = (distributeurId) => {
  return http.get(endpoint + `/distributeur/${distributeurId}`); 
};

export const getProduit = (id) => {
  return http.get(endpoint + `/${id}`);
};
export const getProduitDistributeur = (distributeurId, id) => {
  return http.get(endpoint + `/distributeur/${distributeurId}/${id}`);
};

export const saveProduitDistributeur = (distributeurId,data) => {

  return http.post(
    endpoint + `/distributeur/${distributeurId}/${data.produitId}`,
    data
  );
};
export const createnewProduit = (data)=> {

  return http.post(
    endpoint,
    data
  )
}
export const saveProduitBoisson = (boissonId, produitId, data) => {
  return http.post(endpoint + `/boisson/${boissonId}/${produitId}`, data);
};
export const saveProduit = (data) => {
  return http.post(endpoint, data);
};
