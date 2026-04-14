import http from "./httpService";
import { apiUrl } from "../config/config";
const endpoint = apiUrl.url + "/profileManagement/am";


export const getAM = (id) => http.get(endpoint + `/${id}`);



export default {
getAM , 

};
