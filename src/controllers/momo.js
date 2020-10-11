import spotifyNowPlayingApi from "./spotify/now-playing";
import { renderToString } from "react-dom/server";
import Player from "./now-playing/ui/player";

const fetch = require("node-fetch");

const base64ImageFromUrl = async (imageUrl) => {
  if (imageUrl) {
    const buff = await (await fetch(imageUrl)).arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(buff).toString("base64")}`;
  }
  return null;
};

export default async (req, res) => {
  try {
    console.log("CALLED 4466");
    const username = req.params.id;
    const { payload } = await spotifyNowPlayingApi(username);
    console.log("current", payload);
    const { imageUrl } = payload;
    // res.send(`<img src="${image}" alt="album cover"/>`);
    // res.send(payload);

    const text = renderToString(
      Player({
        cover: base64ImageFromUrl(imageUrl),
        artist: payload.artist,
        track: payload.title,
        isPlaying: true,
        progress: payload.progress,
        duration: payload.duration,
      })
    );
    res.status(200).send(text);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
