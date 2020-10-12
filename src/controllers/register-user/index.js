import firstTimeTokens from "../spotify/first-time-tokens";

export default async (req, res) => {
  const { error, code, state } = req.query;
  const username = state;

  if (error || !code || !state) {
    res.send("unable to connect with spotify, try again! ").status(200);
  } else {
    const { error } = await firstTimeTokens({ username, code });
    if (error) res.send("couldn't connect to spotify, Try again").status(200);
    else {
      res.send("successfully connected to spotify").status(200);
    }
  }
};
