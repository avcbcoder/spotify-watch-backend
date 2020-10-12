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

