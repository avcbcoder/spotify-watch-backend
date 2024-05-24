import { UserService } from "../services";
import { SpotifyService } from "../services";

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

    res.send(JSON.stringify(history));
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
