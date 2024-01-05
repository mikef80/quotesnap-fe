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

export const postNewQuote = async (quote) => {
  const {
    quoteText,
    quoteAuthor,
    quoteOrigin,
    quoteLocation,
    quoteImage,
    quoteIsPrivate,
    quoteCategory,
    quoteUser,
  } = quote;

  try {
    const response = await baseUrl.post("/quotes", {
      quoteText,
      quoteAuthor,
      quoteOrigin,
      quoteLocation,
      quoteImage,
      quoteIsPrivate,
      quoteCategory,
      quoteUser,
    });

    const { quote } = response.data;
    return { quote };
  } catch (error) {
    console.log(error);
  }
};

export const getUserByUsername = (username) => {
  return baseUrl.get(`/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};
