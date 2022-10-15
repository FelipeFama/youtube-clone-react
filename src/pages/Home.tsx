import React,{useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { HomePageVideos } from "../Types";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector ((state) => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);
  
  return (
   <main className="max-h-screen overflow-hidden">
    <header style={{ height: "auto" }}>
     <Navbar />
    </header>
    <div className="flex" style={{ height: "92.5vh" }}>
     <Sidebar />
     {videos.length ? (
      <InfiniteScroll
      dataLength={videos.length}
      next={() => dispatch(getHomePageVideos(true))}
      hasMore={videos.length < 500}
      loader={<Spinner />}
      height={750}
      >
        <section className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
         {videos.map((item: HomePageVideos) => {
           return <Card data={item} key={item.videoId} />;
         })}
        </section>
      </InfiniteScroll>
     ): (
      <Spinner />
     )} 
    </div>
   </main>
  );
}
