import spotifyNowPlayingApi from "../spotify/now-playing";

export default async (req, res) => {
  try {
    const username = req.params.id;
    const { payload } = await spotifyNowPlayingApi(username);
    res.send(payload);
  } catch (error) {
    res.send(error);
  }
};
