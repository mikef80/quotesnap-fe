import axios from 'axios'

const quoteSnapApi = axios.create({ baseURL: "https://quotesnap-be.onrender.com/api" });

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
    const postedQuote = await quoteSnapApi.post("/quotes", {
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
