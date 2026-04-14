import http from "./httpService";
import { apiUrl } from "../config/config";
const endpoint = apiUrl.url + "/stats";


export const getClientsByMonth = () =>{
   return http.get(`${endpoint}/month`);
  }

export const getDistributeursByClient = () => {
    return http.get(`${endpoint}/distributeurs`);
   }


export default {
    getClientsByMonth , 
getDistributeursByClient,

};
