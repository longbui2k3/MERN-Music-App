import React, { useEffect, useState } from "react";
import HeaderCover from "./HeaderCover";
import ActionBar from "./ActionBar";
import { AiFillClockCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getAlbum } from "../api/AlbumAPI";
import SongItem from "./SongItem";

export default function Album() {
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  let params = useParams();
  useEffect(() => {
    const getAllSongs = async () => {
      const albumData = await getAlbum(params.id);
      setAlbum(albumData.data.album);
      setSongs(albumData.data.album.songs);
    };
    getAllSongs();
  }, [params.id]);

  return (
    <>
      <HeaderCover
        type={album.type}
        name={album.name}
        description={album.description}
      />
      <div className="opacity-95 z-40 bg-[#121212]">
        <ActionBar />
        <div className="mx-10 grid grid-cols-[0.1fr_3.2fr_0.4fr] text-gray-400 sticky top-0 bg-[#121212] py-4 px-2.5 transition duration-300 ease-in-out border-b border-current">
          <div>
            <span>#</span>
          </div>
          <div>
            <span>TITLE</span>
          </div>
          <div className="flex justify-center items-center">
            <span>
              <AiFillClockCircle />
            </span>
          </div>
        </div>
        {/* Song list */}
        <div className="mx-[2rem] flex flex-col pb-10">
          {songs.map((song, index) => (
            <SongItem key={song._id} song={song} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
