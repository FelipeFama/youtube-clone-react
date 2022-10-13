import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.REACT_APP_CLONE_YOUTUBE_API_KEY;

export const GetHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVideos", async () =>{}
);