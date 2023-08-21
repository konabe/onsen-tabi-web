const tokenKey = "onsen-token";

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const deleteToken = () => {
  localStorage.removeItem(tokenKey);
};
