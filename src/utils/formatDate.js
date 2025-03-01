export const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Format the date to "Month Day, Year" (e.g., February 3, 2025)
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
};
