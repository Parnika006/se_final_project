import { handleServerResponse } from "./api";

export const register = (email, password, name) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        name,
        email,
        password,
      },
    });
  });
};

export const login = (email, password) => {
  console.log(email, password);
  return new Promise((resolve) => {
    resolve({
      token: "fake token",
      user: { name: "Elise", email: "Elise@gmail.com" },
    });
  });
};

export const saveArticle = (article) => {
  console.log(article);
  // fetch(url, {
  //   headers: {
  //     authorization: `Beaerer ${getToken()}`
  //   }
  // })
  return new Promise((resolve) => {
    resolve(article);
  });
};
