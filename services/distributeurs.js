import http from "./httpService";
import { apiUrl } from "../config/config";
const endpoint = apiUrl.url + "/resourceManagement/distributeur";

export const getAllDistributeur = (idClient, role) => {
  if (role != "SADM") {
    return http.get(
      `https://sitandlipapi.onrender.com/api/v1/resourceManagement/distributeur/client/${idClient}`
    );
  } else {
    return http.get(
      `https://sitandlipapi.onrender.com/api/v1/resourceManagement/distributeur`
    );
  }
};
export const getDistributeurById = (id) => {
  return http.get(endpoint + `/${id}`);
};

export default {
  getAllDistributeur,
  getDistributeurById,
};
