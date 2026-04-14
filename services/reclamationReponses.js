import http from "./httpService";
import { apiUrl } from "../config/config";
const endpoint = apiUrl.url + "/reclamation";


export const getReclamations = () =>{
   return http.get(`${endpoint}/reclamation`);
  }

export const getReclamation = (id) => {
    return http.get(`${endpoint}/reclamation/${id}`);
}
export const getAllResponses = (idReclamation) =>{
  return http.get(`${endpoint}/reponse/all/${idReclamation}`);
 }
export const getResponses = (idReclamation) =>{
  return http.get(`${endpoint}/reponse/${idReclamation}`);
 }
export const saveResponse = (data) => {
  return http.post(`${endpoint}/reponse`, data);
};

export const deleteReclamation = (idReclamation) => {
  return http.delete(`${endpoint}/reclamation/${idReclamation}`);
};


export const deleteResponse = (idReponse) => {
  return http.delete(`${endpoint}/reponse/${idReponse}`);
};


export default {
getReclamations,
getReclamation
};
