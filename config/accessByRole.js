export const roles = {
  superAdmin: ["SADM"],
  admin: ["ADM"],
  agent: ["ADM", "AC", "AM", "DE"],
  client: ["client"],
  annonceur: ["annonceur"],
  guest: ["ADM", "AC", "AM", "DE", "annonceur", "SADM", "client"],
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
