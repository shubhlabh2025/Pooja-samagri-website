import { api } from "./axiosConfig";

export const get = (URL: string) => {
  return api.get(URL);
};

export const post = (URL: string) => {
  return api.post(URL);
};

export const put = (URL: string) => {
  return api.put(URL);
};

export const del = (URL: string) => {
  return api.delete(URL);
};
