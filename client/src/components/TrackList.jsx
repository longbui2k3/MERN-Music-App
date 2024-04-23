import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../api/PlaylistAPI";
import ActionBar from "./ActionBar";
import HeaderCover from "./HeaderCover";
import SongItemPlaylist from "./SongItemPlaylist";
import SearchBarSong from "./SearchBarSong";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState(null);
  const [currentMoreOptions, setCurrentMoreOptions] = useState(null);
  const [inputSearch, setInputSearch] = useState("");

  let params = useParams();
  useEffect(() => {
    const getAllSongs = async () => {
      try {
        const songsData = await getPlaylist(params.id);

        setSongs(songsData.data.metadata.playlist.songs);
      } catch (err) {
        console.log(err);
      }
    };
    getAllSongs();
  }, [params.id, likedSongs?.length]);

  return (
    <>
      <main>
        <HeaderCover type="Playlist" />
        <div className="opacity-95 z-40">
          <ActionBar />
          <div className="mx-8 px-4 grid grid-cols-[0.2fr_2.6fr_1.9fr_1.6fr_1fr] text-gray-400 top-[64px] bg-[#121212] py-4 transition duration-300 ease-in-out border-b border-current">
            <div>
              <span>#</span>
            </div>
            <div>
              <span>Title</span>
            </div>
            <div>
              <span>Album</span>
            </div>
            <div>
              <span>Added Date</span>
            </div>
            <div className="flex  items-center justify-center	ms-[52px]">
              <span>
                <AiFillClockCircle />
              </span>
            </div>
          </div>

          {/* Song list */}
          <div className="mx-[2rem] flex flex-col pb-10 mt-[8px] text-gray-400 border-b border-current">
            {songs.map((playlistsong, index) => (
              <SongItemPlaylist
                playlistsong={playlistsong}
                index={index}
                likedSongs={likedSongs}
                setLikedSongs={setLikedSongs}
                setCurrentMoreOptions={setCurrentMoreOptions}
                currentMoreOptions={currentMoreOptions}
              />
            ))}
          </div>
          <div className="mx-[2rem] mt-[1rem]">
            <div className="text-[20px] text-white font-bold">
              Let's find something for your playlist
            </div>
            <div className="mt-3">
              <SearchBarSong
                inputSearch={inputSearch}
                setInputSearch={setInputSearch}
                playlist={params.id}
                setSongs={setSongs}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
