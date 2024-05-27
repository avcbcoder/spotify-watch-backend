import { UserService, SpotifyService, YoutubeService } from "../services";

export default async (req, res, next) => {
  try {
    const username = req.params.id;
    let history = [];

    const { payload: spotifyTrack } = await SpotifyService.user.lastPlayedSong(
      username
    );

    if (spotifyTrack) {
      history = await UserService.tracks.addToHistory({
        username,
        payload: spotifyTrack,
      });
    } else {
      history = await UserService.tracks.history({ username });
    }

    // no async await, because they return promises
    // parallel execution because runs in parallel
    const videos = [];

    for (const { title, album, artist, id } of history) {
      const video = await YoutubeService.search.videoForSpotifyTrack({
        title,
        album,
        artist,
        id,
      });

      videos.push({
        title,
        album,
        artist,
        videoId: video.videoId,
        views: video.views,
      });
    }

    res.send(JSON.stringify(videos));
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};
