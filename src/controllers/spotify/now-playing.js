import axios from "axios";
import getTokens from "./get-tokens";

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
    imageUrl,
    artist: artistName,
    duration: duration_ms,
  };
};

/**
 * Hit spotify/currently-playing endpoint using token saved in db
 */
export default async (username) => {
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
