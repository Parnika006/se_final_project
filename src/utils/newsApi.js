import { handleServerResponse } from "./api";

const getFormattedDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo); // Subtract days
  return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
};

export const getNews = (searchQuery, apiKey) => {
  const currentDate = getFormattedDate(0); // Today's date
  const sevenDaysAgo = getFormattedDate(7); // 7 days ago

  return fetch(
    `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}&from=${sevenDaysAgo}&to=${currentDate}&pageSize=100`
  ).then(handleServerResponse);
};
