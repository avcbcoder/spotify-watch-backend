import spotifyNowPlayingApi from "../spotify/now-playing";
import { renderToString } from "react-dom/server";
import Player from "./ui/player";
const fetch = require("node-fetch");

const base64ImageFromUrl = async (imageUrl) => {
  if (imageUrl) {
    const buff = await (await fetch(imageUrl)).arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(buff).toString("base64")}`;
  }
  return null;
};

const renderImage = async (res, payload) => {
  const { imageUrl } = payload;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const text = renderToString(
    Player({
      cover: await base64ImageFromUrl(imageUrl),
      artist: payload.artist,
      track: payload.title,
      isPlaying: true,
      progress: payload.progress,
      duration: payload.duration,
    })
  );
  res.status(200).send(text);
};

export default async (req, res, next) => {
  try {
    const username = req.params.id;
    let payload = ""; //default

    const { payload: parsedTrack } = await spotifyNowPlayingApi(username);
    console.log(payload);

    if (parsedTrack) {
      payload = parsedTrack;
      // save to db
    } else {
      // get from db
    }

    payload = payload || {};

    await renderImage(res, payload);
  } catch (error) {
    res.send(error);
  }
};
