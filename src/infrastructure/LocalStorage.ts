const TOKEN_KEY = "onsen-token";

export const getToken = (): string | undefined => {
  const token: string | null = localStorage.getItem(TOKEN_KEY);
  if (token === null) {
    return undefined;
  }
  return token;
};

export const setToken = (token: string | undefined) => {
  if (token === undefined) {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
};
