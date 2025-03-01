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

/* function getArticles() {
  return fetch(`${baseUrl}/articles`).then(handleServerResponse);
}
 */

const saveArticle = (articleUrl, article, searchQuery, token) => {
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      articleUrl,
      article,
      searchQuery,
    }),
  }).then(handleServerResponse);
};

const deleteArticle = (articleId, token) => {
  return fetch(`${baseUrl}/articles/${articleId}`, {
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
};

export default api;
