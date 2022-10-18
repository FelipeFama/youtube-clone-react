import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { RecommendedVideos } from "../../Types";
import { YOUTUBE_API_URL } from "../../utils/constants";
import { parseRecommendedData } from "../../utils/parseRecommendedData";

const API_KEY = import.meta.env.VITE_YOUTUBE_CLONE_REACT_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtubeApp/getRecommendedVideos",
  async (videoId: string, { getState }) => {
    const {
      youtubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId }
        }
      }
    } = getState() as RootState;
    const {
      data: { items }
    } = await axios.get(
      `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );
    const parsedData: RecommendedVideos[] = await parseRecommendedData(
      items,
      videoId
    );
    return { parsedData };
  }
);
