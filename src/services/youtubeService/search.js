import axios from "axios";
import dotenv from "dotenv";
import YtSearchCacheModel from "../../models/ytsearchcache";

dotenv.config();

const { YT_SEARCH_BASE_URL, YT_SEARCH_BASE_URL_PRD } = process.env;

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

const searchVideoInFlask = async function (spotifyTitle, album, spotifyArtist) {
  try {
    const searchQuery = `${spotifyTitle} ${spotifyArtist}`;
    const response = await axios.get(
      `${YT_SEARCH_BASE_URL_PRD}/search_youtube?q=` + searchQuery
    );
    return response.data.video_id;
  } catch (error) {
    console.error("Error fetching video ID:", error);
    throw error; // Re-throw the error for handling in the calling code
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
  const videoIdFromSearch = await searchVideoInFlask(
    trackTitle,
    trackAlbum,
    trackArtist
  );

  if (videoIdFromSearch) {
    const YtSearchCache = new YtSearchCacheModel({
      spotifyTrackId: trackId,
      videoId: videoIdFromSearch,
    });
    await YtSearchCache.save();
    return videoIdFromSearch;
  }

  return {};
};

export { videoForSpotifyTrack };
