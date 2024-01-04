import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://quotesnap-be.onrender.com/api",
});

export const getQoutesByUsername = (username) => {
  return baseUrl
    .get(`/users/${username}/quotes`)
    .then(({ data: { quotes } }) => {
      return quotes;
    });
};

export const getCategories = () => {
  return baseUrl.get("/categories").then(({ data: { categories } }) => {
    return categories;
  });
};
