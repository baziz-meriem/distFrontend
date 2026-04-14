import http from "./httpService";
import { apiUrl } from "../config/config";
const endpoint = apiUrl.url + "/resourceManagement/boisson";


export const getBoissons = (distributeurId) =>{
   return http.get(endpoint + `/${distributeurId}`);
  }

const getBoisson = (distributeurId,id) => http.get(endpoint + `/${id}`);

export const saveBoisson = (distributeurId,data) => {
  return http.post(endpoint + `/distributeur`, data);
};

const updateBoisson = (distributeurId,data) => {
    return http.put(endpoint + `/${distributeurId}`, data);
  };
  
export const deleteBoisson = (distributeurId,id) => {
    return http.delete(`${endpoint}/${distributeurId}/${id}`);
}

export default {
getBoisson , 
getBoissons,
saveBoisson,
updateBoisson,
deleteBoisson 
};
