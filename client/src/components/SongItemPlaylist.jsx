import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { dateDistance } from "../config";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  addSongToLikedSongs,
  getLikedSongsByUser,
  removeSongFromLikedSongs,
} from "../api";
import { IoIosMore } from "react-icons/io";
import VerticalNavigateMoreOptionsSong from "./VerticalNavigateMoreOptionsSong";

export default function SongItemPlaylist({
  playlistsong,
  index,
  likedSongs,
  setLikedSongs,
  setCurrentMoreOptions,
  currentMoreOptions,
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);

  const handleClickOnRow = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };
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
  useEffect(() => {
    getLikedSongsByUserFunc();
  }, []);

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
    if (currentMoreOptions !== index) {
      setIsOpenVNMoreOptionsNew(false);
    }
  }, [currentMoreOptions]);

  const [isOpenVNMoreOptionsNew, setIsOpenVNMoreOptionsNew] = useState(false);
  const openVerticalNavigateMoreOptionsNew = (e) => {
    setIsOpenVNMoreOptionsNew(!isOpenVNMoreOptionsNew);
  };
  useEffect(() => {
    if (isOpenVNMoreOptionsNew) {
      setCurrentMoreOptions(index);
    }
  }, [isOpenVNMoreOptionsNew]);

  return (
    <div
      className={`relative py-2 px-4 grid grid-cols-[0.2fr_2.6fr_1.9fr_1.6fr_1fr] ${
        selectedRow === index ? "" : "hover:bg-[#2a2929]"
      } rounded-[5px] ${selectedRow === index ? "bg-[#5a5959]" : ""}`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      key={index}
    >
      {isOpenVNMoreOptionsNew ? (
        <VerticalNavigateMoreOptionsSong
          setLikedSongs={setLikedSongs}
          songId={playlistsong.song._id}
          isLikedSong={likedSongs?.includes(playlistsong.song._id)}
          song={playlistsong.song}
        />
      ) : (
        ""
      )}
      <div className="flex items-center text-[#dddcdc]">
        {hoveredIndex === index ? (
          <span>
            {playingIndex === index ? (
              <FontAwesomeIcon
                icon={faPause}
                onClick={() => setPlayingIndex(null)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPlay}
                onClick={() => setPlayingIndex(index)}
              />
            )}
          </span>
        ) : (
          <>
            {playingIndex === index ? (
              <FontAwesomeIcon
                icon={faPause}
                onClick={() => setPlayingIndex(null)}
                color="#1dd74c"
              />
            ) : (
              <span>{index + 1}</span>
            )}
          </>
        )}
      </div>

      <div
        className={`flex items-center gap-2 overflow-hidden ${
          playingIndex === index ? "text-[#1dd74c]" : "text-[#dddcdc]"
        }`}
      >
        <div className="h-[40px] w-[40px] ">
          <img src={playlistsong.song.imageURL} alt="track" className="" />
        </div>
        <div className="flex flex-col w-[80%]">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {playlistsong.song.name}
          </span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {playlistsong.song.singers
              .map((item) => item.name + " ")
              .join(", ")}
          </span>
        </div>
      </div>
      <div className="flex items-center text-[#dddcdc] overflow-hidden">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {playlistsong.song.album.name}
        </span>
      </div>
      <div className="flex items-center text-[#dddcdc]">
        <span>{dateDistance(playlistsong.dateAdded)}</span>
      </div>

      <div className="flex items-center text-[#dddcdc] gap-[10%] ps-[34px]">
        {hoveredIndex === index ? (
          <>
            {likedSongs?.includes(playlistsong.song._id) ? (
              <div>
                <AiFillHeart
                  size={"20px"}
                  style={{ color: "#1dd74c" }}
                  className="cursor-pointer me-[20px]"
                  onClick={function (e) {
                    removeSongFromLikedSongsFunc(playlistsong.song._id);
                  }}
                />
              </div>
            ) : (
              <div
                onMouseEnter={() => setIsHoveredHeartIcon(true)}
                onMouseLeave={() => setIsHoveredHeartIcon(false)}
                onClick={function (e) {
                  addSongToLikedSongsFunc(playlistsong.song._id);
                }}
              >
                {isHoveredHeartIcon ? (
                  <AiOutlineHeart
                    size={20}
                    color="white"
                    className="cursor-pointer me-[20px]"
                  />
                ) : (
                  <AiOutlineHeart
                    size={20}
                    color="gray"
                    className=" cursor-pointer me-[20px]"
                  />
                )}
              </div>
            )}

            <div>{playlistsong.song.duration}</div>
            <div>
              <IoIosMore
                size={20}
                color="white"
                className="cursor-pointer"
                onClick={openVerticalNavigateMoreOptionsNew}
              />
            </div>
          </>
        ) : (
          <>
            {likedSongs?.includes(playlistsong.song._id) ? (
              <>
                <div
                  onClick={function (e) {
                    removeSongFromLikedSongsFunc(playlistsong.song._id);
                  }}
                >
                  <AiFillHeart
                    size={"20px"}
                    style={{ color: "#1dd74c" }}
                    className="cursor-pointer me-[20px]"
                  />
                </div>

                <div>{playlistsong.song.duration}</div>
                <div>
                  <IoIosMore className="hidden" size={20} color="white" />
                </div>
              </>
            ) : (
              <>
                <div className="me-[40px]">
                  <AiOutlineHeart className="hidden" size={20} color="gray" />
                </div>
                <div>{playlistsong.song.duration}</div>
                <div>
                  <IoIosMore className="hidden" size={20} color="white" />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
