import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../Types";
import { YOUTUBE_API_URL } from "../../utils/constants";
import { parseData } from "../../utils";

const API_KEY = import.meta.env.VITE_YOUTUBE_CLONE_REACT_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVideos", 
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video`
    );
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken }
  }
);