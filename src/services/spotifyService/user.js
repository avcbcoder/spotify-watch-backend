import axios from "axios";
import UserModel from "../../models/users";
import * as tokenExchange from "./tokenExchange";

/**
 * Parse data returned by spotify/currently-playing endpoint
 */
const parseResponse = (data) => {
  const {
    progress_ms,
    item: { name, artists: artistsArr, album, duration_ms },
  } = data;
  const artistName = artistsArr[0].name;
  const albumName = album.name;

  const images = album.images;
  let imageUrl = "";
  if (images.length >= 2) imageUrl = images[1].url;
  else if (images.length >= 1) imageUrl = images[0].url;

  return {
    progress: progress_ms,
    title: name,
    album: albumName,
    isPlaying: true,
    imageUrl,
    artist: artistName,
    duration: duration_ms,
  };
};

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
    const { error: refreshError, payload: newTokens } =
      await tokenExchange.refreshTokens(oldTokens);
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

/**
 * Hit spotify/currently-playing endpoint using token saved in db
 */
const lastPlayedSong = async (username) => {
  try {
    const tokens = await getTokens(username);
    const accessToken = tokens.accessToken;
    const apiEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    const { data } = await axios.get(apiEndpoint, { headers });
    return { payload: parseResponse(data) };
  } catch (error) {
    return { error: "someting went wrong" };
  }
};

export { lastPlayedSong };
