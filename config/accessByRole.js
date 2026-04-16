export const roles = {
  superAdmin: ["SADM"],
  admin: ["ADM"],
  agent: ["ADM", "AC", "AM", "DE"],
  client: ["client"],
  annonceur: ["annonceur"],
  /** Consommateur = customer accounts (auth/consommateur/login) */
  guest: ["ADM", "AC", "AM", "DE", "annonceur", "SADM", "client", "Consommateur"],
};

export const accessRights = {
  home: ["guest"],
  about: ["guest"],
  login: ["guest"],
  createAgents: ["admin"],
  distributeurs: ["agent"],
  annonce: ["agent"],
  dashboard: ["guest"],
  profil: ["guest"],
  reclamations: ["agent"],
  notifications: ["agent"],
  stats : ["agent"]
};

export default {
  roles,
  accessRights,
};
