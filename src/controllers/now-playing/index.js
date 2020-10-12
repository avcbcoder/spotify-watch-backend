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

export default async (req, res, next) => {
  try {
    const username = req.params.id;
    const { payload } = await spotifyNowPlayingApi(username);
    const { imageUrl } = payload;

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
  } catch (error) {
    res.send(error);
  }
};
