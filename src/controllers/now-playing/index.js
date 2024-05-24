import { renderToString } from "react-dom/server";
import Player from "./ui/player";
import History from "./history";
import { SpotifyService } from "../../services";

const fetch = require("node-fetch");

const base64ImageFromUrl = async (imageUrl) => {
  if (imageUrl) {
    const buff = await (await fetch(imageUrl)).arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(buff).toString("base64")}`;
  }
  return null;
};

const renderImage = async (res, payload) => {
  const {
    imageUrl,
    artist,
    title: track,
    isPlaying,
    progress,
    duration,
  } = payload;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const cover = await base64ImageFromUrl(imageUrl);
  const text = renderToString(
    Player({
      cover,
      artist,
      track,
      isPlaying,
      progress,
      duration,
    })
  );
  res.status(200).send(text);
};

export default async (req, res, next) => {
  try {
    const username = req.params.id;
    let payload = ""; //default

    // const { payload: parsedTrack } = await spotifyNowPlayingApi(username);
    const { payload: parsedTrack } = await SpotifyService.user.lastPlayedSong(
      username
    );
    console.log(payload);

    if (parsedTrack) {
      // if a song is being played - set payload and save to history
      payload = parsedTrack;
      // dont use await - since it should be saved in bkg
      History.set({ username, payload: parsedTrack });
    } else {
      // if a song is not being played - get payload from history
      const { payload: lastPlayedInHistory } = await History.get({ username });
      if (lastPlayedInHistory)
        payload = { ...lastPlayedInHistory, isPlaying: false };
    }

    // if neither a song is being played nor we have history in db
    payload = payload || {
      progress: 40,
      title: "No track playing",
      album: "N/A",
      imageUrl: `https://raw.githubusercontent.com/avcbcoder/avcbcoder/master/images/logo.png`,
      artist: "N/A",
      duration: 100,
    };

    await renderImage(res, payload);
  } catch (error) {
    res.send(error);
  }
};
