import { baseUrl } from "./constants";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

function getArticles(token) {
  if (!token) {
    return Promise.reject("No token found. User might not be logged in.");
  }
  return fetch(`${baseUrl}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

const saveArticle = (article, searchQuery, token, owner) => {
  const payload = {
    source: {
      name: article?.source?.name ?? "Unknown",
    },
    author: article?.author ?? "Unknown",
    title: article?.title ?? "No Title",
    description: article?.description ?? "No Description",
    url: article?.url ?? "No URL",
    urlToImage: article?.urlToImage ?? "No Image",
    publishedAt: article?.publishedAt ?? "No Date",
    content: article?.content ?? "No Content",
    searchQuery,
    owner: owner,
  };

  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ article: payload, searchQuery }),
  }).then(handleServerResponse);
};

const deleteArticle = (article, token) => {
  if (!article._id) {
    console.error("Cannot delete article: Missing _id");
    return;
  }
  return fetch(`${baseUrl}/articles/${article._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const api = {
  getUserInfo,
  saveArticle,
  deleteArticle,
  getArticles,
};

export default api;
