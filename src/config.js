const IS_DEPLOYED = false;
const BASE_URL = IS_DEPLOYED
  ? `https://av-nowplaying.herokuapp.com`
  : `http://localhost:7000`;
const REDIRECT_URI = `${BASE_URL}/register-user`;

export { REDIRECT_URI };
