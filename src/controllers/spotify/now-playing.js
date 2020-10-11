import UserModel from "../../models/users";
import refreshTokens from "./refresh-token";
import axios from "axios";

const getTokens = async (username) => {
  if (!username) throw "Invalid username";
  const user = await UserModel.findOne({ username: username });
  if (!user) throw "Invalid username";

  let tokens = {};
  const { spotify: oldTokens } = user;

  // refresh needed?
  const timeElapsed = new Date().getTime() - oldTokens.lastModified; // in millisec
  const refreshNeeded = timeElapsed > (oldTokens.expiresIn - 10) * 1000;

  if (!refreshNeeded) {
    tokens = oldTokens;
  } else {
    //refresh spotify tokens
    const { error: refreshError, payload: newTokens } = await refreshTokens(
      oldTokens
    );
    if (refreshError) throw refreshError;
    tokens = newTokens;
    // save new tokens to user in background
    UserModel.updateOne(
      { username: username },
      { $set: { spotify: newTokens } }
    );
  }
  return tokens;
};

const spotifyNowPlayingApi = async ({ accessToken }) => {
  console.log("access token received", accessToken);
  const apiEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const { data, error } = await axios.get(apiEndpoint, { headers });
  console.log("now playing", data, error);
  return { payload: data };
};

export default async (req, res) => {
  try {
    const username = req.params.id;
    // res.send(username).status(200);
    const tokens = await getTokens(username);
    // console.log("new tokens", tokens);
    const { payload } = await spotifyNowPlayingApi({
      accessToken: tokens.accessToken,
    });
    res.send(payload);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
