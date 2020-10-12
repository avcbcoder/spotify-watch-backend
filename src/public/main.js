const IS_DEPLOYED = false;
const BASE_URL = IS_DEPLOYED
  ? `https://av-nowplaying.herokuapp.com`
  : `http://localhost:7000`;
const CLIENT_ID = `c0f2e448149f4e6fbfc38771d9cfb151`;
const SCOPES = `user-read-currently-playing user-read-playback-state`;

const REDIRECT_URI = `${BASE_URL}/register-user`;

const spotifyAuthURI = (choosenUsername) =>
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${choosenUsername}&scope=${SCOPES}`;

const initiateSpotifyAuth = () => {
  const input = document.getElementById("choosen-username");
  const choosenUsername = input.value;
  window.open(spotifyAuthURI(choosenUsername), "_self");
};

window.onload = () => {
  const spotifyAuthButton = document.getElementById("initiate-auth");
  spotifyAuthButton.onclick = initiateSpotifyAuth;
};
