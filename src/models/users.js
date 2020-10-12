import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  spotify: {
    type: JSON,
    required: false,
    default: {},
  },
  history: {
    type: JSON,
    required: false,
    default: {},
  },
});

export default mongoose.model("users", UserSchema);
