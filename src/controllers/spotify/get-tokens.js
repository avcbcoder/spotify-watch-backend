import UserModel from "../../models/users";
import refreshTokens from "./refresh-token";

export default async (username) => {
  if (!username) throw "Invalid username";
  const user = await UserModel.findOne({ username: username });
  if (!user) throw "Invalid username";

  let tokens = {};
  const { spotify: oldTokens } = user;

  // refresh needed?
  const timeElapsed = new Date().getTime() - oldTokens.lastModified; // in millisec
  const refreshNeeded = timeElapsed > (oldTokens.expiresIn - 10) * 1000;

  if (!refreshNeeded) {
    tokens = oldTokens;
  } else {
    //refresh spotify tokens
    const { error: refreshError, payload: newTokens } = await refreshTokens(
      oldTokens
    );
    if (refreshError) throw refreshError;
    tokens = newTokens;
    // save new tokens to user in background
    UserModel.updateOne(
      { username: username },
      { $set: { spotify: newTokens } }
    );
  }
  return tokens;
};
