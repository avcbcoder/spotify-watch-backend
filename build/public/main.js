"use strict";

var IS_DEPLOYED = true;
var BASE_URL = IS_DEPLOYED ? "https://av-nowplaying.herokuapp.com" : "http://localhost:7000";
var CLIENT_ID = "c0f2e448149f4e6fbfc38771d9cfb151";
var SCOPES = "user-read-currently-playing user-read-playback-state";

var REDIRECT_URI = BASE_URL + "/register-user";

var spotifyAuthURI = function spotifyAuthURI(choosenUsername) {
  return "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=code&state=" + choosenUsername + "&scope=" + SCOPES;
};

var initiateSpotifyAuth = function initiateSpotifyAuth() {
  var input = document.getElementById("choosen-username");
  var choosenUsername = input.value;
  window.open(spotifyAuthURI(choosenUsername), "_self");
};

window.onload = function () {
  var spotifyAuthButton = document.getElementById("initiate-auth");
  spotifyAuthButton.onclick = initiateSpotifyAuth;
};