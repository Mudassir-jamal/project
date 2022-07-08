import { apiHandle } from "./apiHandle";

export const getUserProfile = (token) => {
  return apiHandle(token).get("/profile");
};

export const updateUserProfile = (token, data) => {
  return apiHandle(token).put("/profile", data);
};
