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
