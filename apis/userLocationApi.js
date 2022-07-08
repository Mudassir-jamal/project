import { apiHandle } from "./apiHandle";

// Get Location api
export const getLocationApi = (token) => {
  return apiHandle(token).get(`/userLocations`);
};

// create Location Api

export const createLocationApi = (token, body) => {
  return apiHandle(token).post("/userLocations", body);
};

// Update Location api
export const updateLocationApi = (token, data) => {
  return apiHandle(token).post(`/userLocations`, data);
};

export const updateLocation = (token, body, id) => {
  return apiHandle(token).put(`/userLocations/${id}`, body);
};
