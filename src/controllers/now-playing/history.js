import UserModel from "../../models/users";

/**
 * get last played track payload from history
 */
const get = async ({ username }) => {
  try {
    let user = await UserModel.findOne({ username: username });
    if (!user) {
      throw "Invalid username";
    }
    const { history: lastPlayedTrack } = user;

    return { payload: lastPlayedTrack };
  } catch (error) {
    return { error };
  }
};

/**
 * set last played track to history
 */
const set = async ({ username, payload: lastPlayedTrack }) => {
  try {
    let user = await UserModel.findOne({ username: username });
    if (!user) {
      throw "Invalid username";
    }

    await UserModel.updateOne(
      { username: username },
      { $set: { history: lastPlayedTrack } }
    );

    return { payload: true };
  } catch (error) {
    return { error };
  }
};

export default { get, set };
