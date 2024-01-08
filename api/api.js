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
    const postedQuote = await baseUrl.post("/quotes", {
      quoteText,
      quoteAuthor,
      quoteOrigin,
      quoteLocation,
      quoteImage,
      quoteIsPrivate,
      quoteCategory,
      quoteUser,
    });
    console.log(postedQuote);
    return postedQuote;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByUsername = (username, password) => {
  console.log(username, inputPassword)
  return baseUrl.get(`/users/${username}`, { params: { password: password } })
  .then(res => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
};
