import dotenv from "dotenv";
import axios from "axios";
import qs from "querystring";
import UserModel from "../../models/users";
import { REDIRECT_URI } from "../../config";

dotenv.config();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

/**
 * @param {authCode} : got in first step
 */
export default async ({ username, code }) => {
  try {
    let user = await UserModel.findOne({ username: username });
    if (!user) {
      const newUser = new UserModel({
        username,
      });
      await newUser.save();
      user = await UserModel.findOne({ username: username });
    }
    const spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
    const requestBody = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    };
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
    return { payload: true };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
