import dotenv from "dotenv";

dotenv.config();

const { CLIENT_ID, SERVER_BASE_URL } = process.env;

const spotifyAuthUrl = () => {
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${SERVER_BASE_URL}/connect-spotify&response_type=code&state=${"hey"}`;
};

export default async (req, res) => {
  res
    .send(
      `<a
      href="${spotifyAuthUrl()}"
      target="_blank"
      style="color: rgb(194, 201, 207);"
    >
      connect spotify
    </a>`
    )
    .status(200);
};
