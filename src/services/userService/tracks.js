import UserModel from "../../models/users";

const MAX_TRACKS_IN_HISTORY = 5;

/**
 * Get user's track history from the database
 * @param {Object} param - Object containing the username
 * @returns {Promise<Array>} - Promise resolving to an array representing the track history
 */
const getHistoryFromDb = async ({ username }) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw "Invalid username";
  }
  const { trackHistory = [] } = user;
  return trackHistory;
};

/**
 * Get user's track history
 * @param {Object} param - Object containing the username
 * @returns {Promise<Array>} - Promise resolving to an array representing the track history
 */
const history = async ({ username }) => getHistoryFromDb({ username });

/**
 * Get the last played track of a user
 * @param {Object} param - Object containing the username
 * @returns {Promise<Object>} - Promise resolving to an object containing the last played track
 */
const getLastPlayedTrack = async ({ username }) => {
  const trackHistory = await getHistoryFromDb({ username });
  const lastPlayedTrack = trackHistory[0];

  return { payload: lastPlayedTrack };
};

/**
 * Add a new track to the user's track history
 * @param {Object} param - Object containing the username and the new track payload
 * @returns {Promise<Object>} - Promise resolving to an object indicating the success of the operation
 */
const addToHistory = async ({ username, payload: newTrack }) => {
  let trackHistory = await getHistoryFromDb({ username });

  const lastTrackId = trackHistory.length > 0 ? trackHistory[0].id : -1;
  const newTrackId = newTrack.id;

  if (newTrackId === lastTrackId) {
    return;
  }

  // add new track to start of array
  trackHistory.unshift(newTrack);

  // remove last track if it exceeds than allowed tracks in history
  if (trackHistory.length > MAX_TRACKS_IN_HISTORY) {
    trackHistory = trackHistory.slice(0, MAX_TRACKS_IN_HISTORY);
  }

  await UserModel.updateOne(
    { username },
    { $set: { trackHistory: trackHistory } }
  );

  return trackHistory;
};

export { getLastPlayedTrack, addToHistory, history };
