import { dataWithFiles } from "../helper/common_functions";
import { apiHandle } from "./apiHandle";

// Create Order Api
export const createOrderApi = (token, data) => {
  console.log(data, "apii");
  if (data.image_url !== "" || data.voice_note_url !== "")
    return apiHandle(token, true).post(`/orders`, dataWithFiles(data));
  else return apiHandle(token, true).post(`/orders`, data);
};

// Get Order Api
export const getOrdersApi = (token) => {
  return apiHandle(token).get(`/orders`);
};

// Get Order By ID Api
export const getOrderByIdApi = (token, id) => {
  return apiHandle(token).get(`/orders/${id}`);
};

// Get Oder Files By ID Api
export const getOrderFilesApi = (token, params) => {
  return apiHandle(token).get("/files/order", { params });
};

// Cancel Order By ID Api
export const orderCancelByIdApi = (token, id) => {
  return apiHandle(token).delete(`/orders/${id}`);
};
