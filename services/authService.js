import http from "./httpService";
import { apiUrl } from "../config/config";

const apiEndpoint = apiUrl.url + "/auth";

/**
 * Maps API / UI role names to the URL segment for
 * POST /api/v1/auth/{slug}/login|forgotPassword|...
 */
export function roleToAuthPathSlug(role) {
  if (!role) return "consommateur";
  const lower = String(role).trim().toLowerCase();
  const map = {
    sadm: "sadm",
    adm: "adm",
    ac: "ac",
    am: "am",
    de: "de",
    consommateur: "consommateur",
    customer: "consommateur",
    client: "client",
    annonceur: "annonceur",
  };
  return map[lower] ?? lower;
}

export async function getRole(email) {
  return await http.get(`${apiEndpoint}/role?email=${email}`);
}

export async function login(email, password, roleOrSlug) {
  const slug = roleToAuthPathSlug(roleOrSlug);
  return await http.post(`${apiEndpoint}/${slug}/login`, { email, password });
}

export async function forgotPassword(email, role) {
  const slug = roleToAuthPathSlug(role);
  const res = await http.post(`${apiEndpoint}/${slug}/forgotPassword`, { email });
  return res;
}

export async function resetNewPassword(token, role, password, confirmPassword) {
  const slug = roleToAuthPathSlug(role);
  return await http.put(
    `${apiEndpoint}/${slug}/resetPassword/${token}`,
    { password, confirmPassword }
  );
}

/** JWT / token may appear under several keys depending on the API */
export function getTokenFromLoginPayload(data) {
  if (!data || typeof data !== "object") return null;
  return (
    data.token ||
    data.accessToken ||
    data.jwt ||
    data.data?.token ||
    data.data?.accessToken ||
    data.data?.jwt ||
    null
  );
}

/** User object may be nested or named per profile type */
export function getUserFromLoginPayload(data) {
  if (!data || typeof data !== "object") return {};
  const nested = data.data && typeof data.data === "object" ? data.data : null;
  return (
    data.user ||
    nested?.user ||
    data.agent ||
    data.consommateur ||
    data.costumer ||
    data.customer ||
    nested?.consommateur ||
    nested?.agent ||
    nested?.costumer ||
    (nested && !nested.token && !nested.accessToken ? nested : {}) ||
    {}
  );
}

export function getRoleFromLoginPayload(data, loginSlug) {
  if (!data || typeof data !== "object") {
    return loginSlug === "sadm" ? "SADM" : "Consommateur";
  }
  const r =
    data.role ||
    data.data?.role ||
    data.user?.role ||
    data.data?.user?.role;
  if (r) return String(r);
  return loginSlug === "sadm" ? "SADM" : "Consommateur";
}

/**
 * Whether the login response indicates success (handles common API variants).
 */
export function isLoginSuccess(data) {
  if (!data) return false;
  if (data.success === true || data.success === "true") return true;
  if (data.status === "success" || data.status === "OK") return true;
  const token = getTokenFromLoginPayload(data);
  if (token) return true;
  return false;
}

/**
 * Normalizes API login payload into the cookie shape used by the app.
 */
export function buildUserFromLoginResponse(data, loginSlug) {
  const user = getUserFromLoginPayload(data);
  const token = getTokenFromLoginPayload(data);
  const role = getRoleFromLoginPayload(data, loginSlug);

  const id =
    user.id ??
    user._id ??
    data.id ??
    data.data?.id ??
    null;

  const name =
    user.nom ??
    user.name ??
    (user.prenom && user.nom ? `${user.prenom} ${user.nom}`.trim() : null) ??
    user.prenom ??
    "";

  const idClient = user.idClient ?? user.id_client ?? data.idClient ?? null;

  return {
    id,
    role,
    token,
    name,
    idClient,
  };
}

export function persistAuthToken(token) {
  if (token) {
    http.setJwt(token);
  }
}

export default {
  getRole,
  login,
  forgotPassword,
  resetNewPassword,
  roleToAuthPathSlug,
  isLoginSuccess,
  buildUserFromLoginResponse,
  persistAuthToken,
  getTokenFromLoginPayload,
  getUserFromLoginPayload,
};
