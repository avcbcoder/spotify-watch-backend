import axios from "axios";
import qs from "querystring";
import { config } from "dotenv";

config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export default async (currentTokens) => {
  const url = "https://accounts.spotify.com/api/token";
  const requestBody = {
    grant_type: "refresh_token",
    refresh_token: currentTokens.refreshToken,
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
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
