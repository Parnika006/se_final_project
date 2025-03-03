import { handleServerResponse } from "./api";

const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const getFormattedDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo); // Subtract days
  return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
};

export const getNews = (searchQuery, apiKey) => {
  const currentDate = getFormattedDate(0); // Today's date
  const sevenDaysAgo = getFormattedDate(7); // 7 days ago

  return fetch(
    `${newsApiBaseUrl}?q=${searchQuery}&apiKey=${apiKey}&from=${sevenDaysAgo}&to=${currentDate}&pageSize=100`
  ).then(handleServerResponse);
};
