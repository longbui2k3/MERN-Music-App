import React, { useEffect, useState } from "react";
import { getPlaylist } from "../api";
import { getAlbumById } from "../api";
import { useParams } from "react-router-dom";
import { RiMusic2Line } from "react-icons/ri";

export default function HeaderCover({ type }) {
  const [musiclist, setMusiclist] = useState({});
  const [duration, setDuration] = useState("");
  let params = useParams();
  useEffect(() => {
    const getMusiclistFunc = async () => {
      try {
        let res;
        if (params.id)
          if (type === "Album") {
            res = await getAlbumById(params.id);
            setMusiclist(res.data.metadata.album);
            const totalSeconds = res.data.metadata.album.songs
              .map((song) => {
                const [minutes, seconds] = song.duration
                  .split(":")
                  .map((value) => value - 0);

                const totalSeconds = minutes * 60 + seconds;
                return totalSeconds;
              })
              .reduce((total, value) => {
                return total + value;
              }, 0);
            setDuration(
              `${Math.floor(totalSeconds / 60)} min ${totalSeconds % 60} sec`
            );
          } else if (type === "Playlist") {
            res = await getPlaylist(params.id);
            setMusiclist(res.data.metadata.playlist);
          }
      } catch (err) {
        console.log(err);
      }
    };
    getMusiclistFunc();
  }, [params.id]);
  useEffect(() => {
    if (musiclist.name) document.title = `${musiclist.name}`;
  }, [musiclist]);
  return (
    <div className="w-full mx-0 my-0.5 flex items-center gap-0.5 pl-[20px] pr-[20px] ">
      <div className="image">
        {musiclist.imageURL ? (
          <img
            className="shadow-2xl w-[128px] h-[128px] rounded-[4px] mr-[16px]"
            src={`${musiclist.imageURL}`}
            alt="Selected Musiclist"
          />
        ) : (
          <div className="flex flex-col justify-center w-[128px] h-[128px] bg-[rgb(40,40,40)] rounded-[4px] mr-[16px]">
            <RiMusic2Line className="text-[50px] mx-auto" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 text-gray-300">
        <span className="type">
          {musiclist.type === "Album" && musiclist.songs.length === 1
            ? "Single"
            : musiclist.type}
        </span>
        <h1 className="text-white text-6xl font-bold">{musiclist.name}</h1>
        <div className="description">
          {musiclist.type === "Album"
            ? musiclist.musiclist_attributes?.singers
                ?.map((singer) => singer.name)
                .join(" • ") +
              " • " +
              `${musiclist.songs.length} songs` +
              " • " +
              `${duration}`
            : musiclist.musiclist_attributes?.user?._id}
        </div>
      </div>
    </div>
  );
}
