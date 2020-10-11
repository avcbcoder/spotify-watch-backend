import axios from "axios";
import qs from "querystring";
import { config } from "dotenv";

config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

export default async (currentTokens) => {
  const url = "https://accounts.spotify.com/api/token";
  const requestBody = {
    grant_type: "refresh_token",
    refresh_token: currentTokens.refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const axiosResponse = await axios.post(
      url,
      qs.stringify(requestBody),
      header
    );
    const { data } = axiosResponse;
    const tokens = {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token
        ? data.refresh_token
        : currentTokens.refreshToken,
      lastModified: new Date().getTime(),
      tokenType: data.token_type ? data.token_type : currentTokens.tokenType,
    };
    return { error: false, payload: tokens };
  } catch (error) {
    return { error: true };
  }
};