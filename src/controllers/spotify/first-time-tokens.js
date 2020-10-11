import axios from "axios";
import qs from "querystring";
import { config } from "dotenv";
import UserModel from "../../models/users";

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
    if (!user) {
      const newUser = new UserModel({
        username,
      });
      await newUser.save();
    }

    const spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
    const requestBody = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:7000/register-user",
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

    return { payload: true };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};