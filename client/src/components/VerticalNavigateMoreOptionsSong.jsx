import { GoPlus, GoPlusCircle } from "react-icons/go";
import { PiListPlus } from "react-icons/pi";
import { FaCaretRight } from "react-icons/fa";
import { useState } from "react";
import VerticalNavigateFavoritePlaylist from "./VerticalNavigateFavoritePlaylist";
import { addSongToLikedSongs, removeSongFromLikedSongs } from "../api";
import { IoIosCheckmarkCircle } from "react-icons/io";
export default function VerticalNavigateMoreOptionsSong({
  setLikedSongs,
  songId,
  isLikedSong,
  song,
}) {
  const [isOpenVNFavoritePlaylistNew, setIsOpenVNFavoritePlaylistNew] =
    useState(false);
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
  const removeSongFromLikedSongsFunc = async (songId) => {
    try {
      const res = await removeSongFromLikedSongs(songId);
      setLikedSongs(
        res.data.metadata.likedSongs.songs.map((song) => song.song)
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  function clickAddToLikedSongs(e) {
    addSongToLikedSongsFunc(songId);
  }
  function clickRemoveFromLikedSongs(e) {
    removeSongFromLikedSongsFunc(songId);
  }
  return (
    <>
      <nav
        className={`navigate-viewmode absolute z-[1000] w-[260px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)]`}
        style={{
          right: `18px`,
          top: `40px`,
        }}
      >
        {isOpenVNFavoritePlaylistNew ? (
          <VerticalNavigateFavoritePlaylist
            setIsOpenVNFavoritePlaylistNew={setIsOpenVNFavoritePlaylistNew}
            song={song}
          />
        ) : (
          ""
        )}
        <ul>
          <li
            className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
            // onMouseDown={clickViewAsCompact}
            onMouseEnter={() => {
              setIsOpenVNFavoritePlaylistNew(true);
            }}
          >
            <GoPlus size={20} color="white" className="me-3 my-auto" />
            Add to Playlist
            <FaCaretRight size={20} color="white" className="ms-[80px]" />
          </li>
          {!isLikedSong ? (
            <li
              className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
              onMouseEnter={() => {
                setIsOpenVNFavoritePlaylistNew(false);
              }}
              onMouseDown={clickAddToLikedSongs}
            >
              <GoPlusCircle size={20} color="white" className="me-3 my-auto" />
              Save to your Liked Songs
            </li>
          ) : (
            <li
              className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
              onMouseEnter={() => {
                setIsOpenVNFavoritePlaylistNew(false);
              }}
              onMouseDown={clickRemoveFromLikedSongs}
            >
              <IoIosCheckmarkCircle
                size={20}
                color="#1ED760"
                className="me-3 my-auto"
              />
              Remove from your Liked Songs
            </li>
          )}

          <li
            className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
            onMouseEnter={() => {
              setIsOpenVNFavoritePlaylistNew(false);
            }}
            // onMouseDown={clickViewAsCompact}
          >
            <PiListPlus size={20} color="white" className="me-3 my-auto" />
            Add to queue
          </li>
        </ul>
      </nav>
    </>
  );
}
