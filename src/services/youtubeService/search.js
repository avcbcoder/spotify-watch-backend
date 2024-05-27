import axios from "axios";
import dotenv from "dotenv";
import YtSearchCacheModel from "../../models/ytsearchcache";

dotenv.config();

const { YT_SEARCH_BASE_URL } = process.env;

const searchVideoInCache = async (spotifyTrackId) => {
  const ytsearchcache = await YtSearchCacheModel.findOne({
    spotifyTrackId,
  });

  if (ytsearchcache) {
    const { videoId, title, views } = ytsearchcache;

    return { videoId, title, views };
  }

  return null;
};

const searchVideoInAwsBackend = async (spotifyTitle, album, spotifyArtist) => {
  const searchTerm = `${spotifyTitle} ${spotifyArtist}`;
  const response = await axios.get(
    `${YT_SEARCH_BASE_URL}/search/${searchTerm}`
  );

  try {
    if (!response.data || !response.data.data) {
      console.log(" No data from yt aws backend ");
    }

    console.log("result for searching ", searchTerm, response.data.data);

    const video = response.data.data[0];
    const { video_id, title, views_int } = video;

    if (!video_id || !title || !views_int) {
      throw "Bad video result from yt search backend";
    }

    return { videoId: video_id, title, views: views_int };
  } catch (err) {
    // console.log(err);
  }
};

/**
 *
 * @param {*} spotifyTrack
 * @returns {videoId, title, viewsInt}
 */
const videoForSpotifyTrack = async (spotifyTrack) => {
  const {
    id: trackId,
    title: trackTitle,
    album: trackAlbum,
    artist: trackArtist,
  } = spotifyTrack;

  // search in cache first
  const videoInCache = await searchVideoInCache(trackId);

  if (videoInCache) {
    return videoInCache;
  }

  // search in yt search backend
  const videoInAws = await searchVideoInAwsBackend(
    trackTitle,
    trackAlbum,
    trackArtist
  );

  if (videoInAws) {
    const YtSearchCache = new YtSearchCacheModel({
      spotifyTrackId: trackId,
      videoId: videoInAws.videoId,
      title: videoInAws.title,
      views: videoInAws.views,
    });
    await YtSearchCache.save();
    return videoInAws;
  }

  return {};
};

export { videoForSpotifyTrack };
