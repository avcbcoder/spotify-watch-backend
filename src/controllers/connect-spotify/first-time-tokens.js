import axios from "axios";
import qs from "querystring";
import { config } from "dotenv";

config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * @param {authCode} : got in first step
 */
export default async ({ username, code }) => {
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) throw "please login";

    const spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
    const requestBody = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://avc-collab.herokuapp.com/spotify/auth",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };
    console.log("error=>" + JSON.stringify(requestBody), { REDIRECT_URI });
    const header = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data } = await axios.post(
      spotifyTokenEndpoint,
      qs.stringify(requestBody),
      header
    );
    const newTokens = {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
      lastModified: new Date().getTime(),
      tokenType: data.token_type,
    };

    // set newTokens to user
    const { spotify } = user;
    const spotifyObj = { ...spotify, ...newTokens };
    await UserModel.updateOne(
      { username: username },
      { $set: { spotify: spotifyObj } }
    );
    await UserModel.updateOne(
      { username: username },
      { $set: { spotifyConnected: true } }
    );

    return { payload: true };
  } catch (error) {
    console.log(error.response);
    return { error: true };
  }
};