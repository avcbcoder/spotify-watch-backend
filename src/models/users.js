import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  spotifyConnected: {
    type: Boolean,
    required: true,
    default: false,
  },
  spotify: {
    type: JSON,
    required: false,
    default: {},
  },
});

export default mongoose.model("users", UserSchema);
