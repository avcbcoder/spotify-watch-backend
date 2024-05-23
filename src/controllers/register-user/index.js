import firstTimeTokens from "../spotify/first-time-tokens";

export default async (req, res) => {
  console.log("request came in /register-user");
  const { error, code, state } = req.query;
  const username = state;

  console.log({ error, code, state, username });

  // if (error || !code || !state) {
  //   res.send("unable to connect with spotify, try again! ").status(200);
  // } else {
  // const { error } =
  await firstTimeTokens({ username, code });
  // if (error) res.send("couldn't connect to spotify, Try again").status(200);
  // else {
  //   res.send("successfully connected to spotify").status(200);
  // }
  // }
  res.send("don't know");
};
