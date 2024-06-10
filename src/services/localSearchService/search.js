import axios from "axios";
import dotenv from "dotenv";
import YtSearchCacheModel from "../../models/ytsearchcache";
import puppySearch from "../puppeteer";

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

const searchVideoInPuppeteer = async (spotifyTitle, album, spotifyArtist) => {
  const searchTerm = `${spotifyTitle} ${spotifyArtist}`;
  const videoId = await puppySearch(searchTerm);

  return { videoId: videoId, title: "N/A", views: 0 };
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
  const videoInAws = await searchVideoInPuppeteer(
    trackTitle,
    trackAlbum,
    trackArtist
  );

  // save search result
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
