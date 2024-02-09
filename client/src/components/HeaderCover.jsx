import React, { useEffect, useState } from "react";
import { getPlaylist } from "../api";
import { useParams } from "react-router-dom";

export default function HeaderCover() {
  const [playlist, setPlaylist] = useState({});
  let params = useParams();
  useEffect(() => {
    const getPlaylistFunc = async () => {
      const songsData = await getPlaylist(params.id);
      console.log(songsData.data.playlist);
      setPlaylist(songsData.data.playlist);
    };
    getPlaylistFunc();
  }, [params.id]);

  return (
    <div className="w-full mx-0 my-0.5 flex items-center gap-0.5 pl-[20px] pr-[20px] ">
      <div className="image">
        <img
          className="h-60 shadow-2xl w-[128px] h-[128px] rounded-[4px] mr-[16px]"
          src={`${playlist.imageURL}`}
          alt="Selected Playlist"
        />
      </div>
      <div className="flex flex-col gap-4 text-gray-300">
        <span className="type">
          {playlist.type === "Album" && playlist.songs.length === 1
            ? "Single"
            : playlist.type}
        </span>
        <h1 className="text-white text-6xl font-bold">{playlist.name}</h1>
        <div className="description">
          {/* {playlist.singers.map((singer) => singer.name).join(" • ")} */}
        </div>
      </div>
    </div>
  );
}
