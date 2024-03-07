import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { AiFillClockCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { useParams } from "react-router-dom";
import {
  addSongToLikedSongs,
  getLikedSongsByUser,
  removeSongFromLikedSongs,
} from "../api";
import { getPlaylist } from "../api/PlaylistAPI";
import ActionBar from "./ActionBar";
import HeaderCover from "./HeaderCover";
import { dateDistance } from "../config";
import SongItemPlaylist from "./SongItemPlaylist";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [currentMoreOptions, setCurrentMoreOptions] = useState(null);
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

  const getLikedSongsByUserFunc = async () => {
    try {
      const res = await getLikedSongsByUser();
      setLikedSongs(
        res.data.metadata.likedSongs.songs.map((song) => song.song)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addSongToLikedSongsFunc = async (song) => {
    try {
      const res = await addSongToLikedSongs(song);
      setLikedSongs(
        res.data.metadata.likedSongs.songs.map((song) => song.song)
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const removeSongFromLikedSongsFunc = async (song) => {
    try {
      const res = await removeSongFromLikedSongs(song);
      setLikedSongs(
        res.data.metadata.likedSongs.songs.map((song) => song.song)
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLikedSongsByUserFunc();
  }, [likedSongs]);

  // const msToMinutesAndSeconds = (ms) => {
  //   const minutes = Math.floor(ms / 60000);
  //   const seconds = ((ms % 60000) / 1000).toFixed(0);
  //   return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  // };

  const handleClickOnRow = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <>
      <main>
        <HeaderCover type="Playlist" />
        <div className="opacity-95 z-40">
          <ActionBar />
          <div className="mx-8 px-4 grid grid-cols-[0.2fr_2.6fr_1.9fr_1.6fr_1fr] text-gray-400 sticky top-[64px] bg-[#121212] py-4 transition duration-300 ease-in-out border-b border-current">
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
          <div className="mx-[2rem] flex flex-col pb-10 mt-[8px]">
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
        </div>
      </main>
    </>
  );
}
