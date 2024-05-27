import mongoose from "mongoose";

const YtSearchCacheSchema = mongoose.Schema({
  spotifyTrackId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  views: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("ytsearchcache", YtSearchCacheSchema);
