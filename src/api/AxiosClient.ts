import axios from "axios";
const baseDomain = "http://localhost:8080"; // API for products

export const customHeaders = {
  Accept: "application/json",
};

export const baseUrl = `${baseDomain}/api`;
export const baseAuthorUrl = `${baseDomain}/author/api`;

export const client = axios.create({
  baseURL: baseUrl,
  headers: customHeaders,
  withCredentials: true,
});

export const authorClient = axios.create({
  baseURL: baseAuthorUrl,
  headers: customHeaders,
  withCredentials: true,
});

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
