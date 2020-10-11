const BASE_URL = `http://localhost:7000`;
const CLIENT_ID = `c0f2e448149f4e6fbfc38771d9cfb151`;

const spotifyAuthURI = (choosenUsername) =>
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${BASE_URL}/connect-spotify&response_type=code&state=${choosenUsername}`;

const initiateSpotifyAuth = () => {
  const input = document.getElementById("choosen-username");
  const choosenUsername = input.value;
  window.open(spotifyAuthURI(choosenUsername), "_self");
};

window.onload = () => {
  const spotifyAuthButton = document.getElementById("initiate-auth");
  spotifyAuthButton.onclick = initiateSpotifyAuth;
};
