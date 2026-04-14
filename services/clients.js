import http from "./httpService";
import { apiUrl } from "../config/config";
const endpoint = apiUrl.url + "/profileManagement/client";


export const getClients = () =>{
   return http.get(endpoint);
  }

export const getClient = (id) => {
    return http.get(endpoint + `/${id}`);
}

export const addClient = (data) => {
  return http.post(endpoint , data);
};

export const updateClient = (id,data) => {
    return http.put(endpoint + `/${id}`, data);
  };
  
export const deleteClient = (id) => {
    return http.delete(`${endpoint}/${id}`);
}


