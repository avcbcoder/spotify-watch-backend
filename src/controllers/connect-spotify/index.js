import dotenv from "dotenv";
import firstTimeTokens from "./first-time-tokens";
dotenv.config();

const { CLIENT_ID } = process.env;
const SERVER_BASE_URL = "http://localhost:4001/redr";

const spotifyAuthUrl = () => {
  return `https://accounts.spotify.com/authorize?
    client_id=${CLIENT_ID}&
    redirect_uri=${SERVER_BASE_URL}/connect-spotify/auth&response_type=code&state=${"hey"}`;
};

export default async (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state; // user id right now
  const username = state;

  console.log({ code, state, username });

  if (error || !code || !state) {
    const err = error
      ? "error from spotify " + error
      : code
      ? "state error =" + state
      : " code error= " + code;
    res
      .send(
        "unable to connect with spotify, try again! " + "<br/> error: " + err
      )
      .status(200);
  } else {
    const { error } = await firstTimeTokens({ username, code });
    if (error) res.send("couldn't connect to spotify, Try again").status(200);
    else {
      res.send("successfully connected to spotify").status(200);
      res.redirect(`https://avc-collab.netlify.app/intro`);
    }
    console.log("came in 2nd");
  }
};
