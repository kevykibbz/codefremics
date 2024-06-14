import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setTokensInCookies = (accessToken: string, refreshToken: string) => {
  cookies.set("access_token", accessToken, { path: "/" });
  cookies.set("refresh_token", refreshToken, { path: "/" });
};

export const getAccessTokenFromCookies = (): string | undefined => {
  return cookies.get("access_token");
};

export const getRefreshTokenFromCookies = (): string | undefined => {
  return cookies.get("refresh_token");
};

export const clearTokensFromCookies = () => {
  cookies.remove("access_token");
  cookies.remove("refresh_token");
};
