const TOKEN_KEY = "access_token";

export const authStorage = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    console.log(localStorage.getItem(TOKEN_KEY))
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};
