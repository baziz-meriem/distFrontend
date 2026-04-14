import http from "./httpService";
import { apiUrl } from "../config/config";
import jwtDecode from "jwt-decode";
import axios from "axios";
const apiEndpoint = apiUrl.url + "/auth";
//http.setJwt(getJwt());
//axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

// get user type
export async function getRole(email) {
    return await http.get(`${apiEndpoint}/role?email=${email}`);
   // localStorage.setItem("token", jwt);
  }
// login a user
export async function login(email, password,role) {
  return await http.post(`${apiEndpoint}/${role}/login`, { email, password });
  //localStorage.setItem("token", jwt);
}
// forget password
export async function forgotPassword(email,role) {
    const res = await http.post(`${apiEndpoint}/${role}/forgotPassword`, { email});
    return res
  }
// reset password
export async function resetNewPassword(token,role,password,confirmPassword) {
  const a = await http.put(`${apiEndpoint}/${role}/resetPassword/${token}`,{password,confirmPassword});
return a
}
export default {
  getRole,
  login,
  forgotPassword,
  resetNewPassword
 
};
