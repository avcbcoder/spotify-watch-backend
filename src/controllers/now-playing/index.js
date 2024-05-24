import { renderToString } from "react-dom/server";
import Player from "./ui/player";
import { UserService } from "../../services";
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

const refreshSpotifyTrack = async (username) => {
  return track;
};

const getLastTrackFromDb = async (username) => {
  // if a song is not being played - get payload from history
  const { payload: track } = await UserService.tracks.getLastPlayedTrack({
    username,
  });
  if (track) {
    return { ...track, isPlaying: false };
  }
  return null;
};

export default async (req, res) => {
  try {
    const username = req.params.id;

    let recentTrack = {
      progress: 40,
      title: "No track playing",
      album: "N/A",
      imageUrl: `https://raw.githubusercontent.com/avcbcoder/avcbcoder/master/images/logo.png`,
      artist: "N/A",
      duration: 100,
    };

    const { payload: spotifyTrack } = await SpotifyService.user.lastPlayedSong(
      username
    );

    // if a song is being played - set payload and save to history
    if (spotifyTrack) {
      UserService.tracks.addToHistory({
        username,
        payload: spotifyTrack,
      });
      recentTrack = spotifyTrack;
    } else {
      const trackHistory = await UserService.tracks.history({ username });
      if (trackHistory.length > 0) {
        recentTrack = trackHistory[0];
      }
    }

    await renderImage(res, recentTrack);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
