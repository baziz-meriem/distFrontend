import { accessRights, roles } from "@/config/accessByRole";

export const hasAccess = (role, page) => {
  let canRead = false;
  accessRights[page]?.map((right, key) => {
    if (roles[right]?.includes(role)) {
      canRead = true;
    }
  });
  return canRead;
};
