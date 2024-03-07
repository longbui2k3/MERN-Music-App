import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import {
  addSongToLikedSongs,
  getLikedSongsByUser,
  removeSongFromLikedSongs,
} from "../api";
import VerticalNavigateMoreOptions from "./VerticalNavigateMoreOptionsSong";

export default function SongItem({
  song,
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
  // const msToMinutesAndSeconds = (ms) => {
  //   const minutes = Math.floor(ms / 60000);
  //   const seconds = ((ms % 60000) / 1000).toFixed(0);
  //   return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  // };

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
      console.log(res);
      setLikedSongs(
        res.data.metadata.likedSongs.songs.map((song) => song.song)
      );
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
    <>
      <div
        className={`relative py-2 px-4 grid grid-cols-[0.1fr_3.2fr_0.4fr] hover:bg-[rgb(35,35,35)] rounded-md ${
          selectedRow === index ? "" : "hover:bg-[#2a2929]"
        } ${selectedRow === index ? "bg-[#5a5959]" : ""}`}
        onClick={() => handleClickOnRow(index)}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        key={song._id}
      >
        {isOpenVNMoreOptionsNew ? (
          <VerticalNavigateMoreOptions
            setLikedSongs={setLikedSongs}
            songId={song._id}
            isLikedSong={likedSongs?.includes(song._id)}
            song={song}
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
          className={`flex items-center text-white gap-4 ${
            playingIndex === index ? "text-[#1dd74c]" : "text-[#dddcdc]"
          }`}
        >
          <div className="h-[40px] w-[40px]">
            <img src={song.imageURL} alt="track" />
          </div>
          <div className="flex flex-col">
            <span className="name">{song.name}</span>
            <span>{song.singers.map((singer) => singer.name).join(", ")}</span>
          </div>
        </div>
        <div className="flex items-center text-[#dddcdc] gap-[10%]">
          {hoveredIndex === index ? (
            <>
              {likedSongs?.includes(song._id) ? (
                <div
                  onMouseEnter={() => setIsHoveredHeartIcon(true)}
                  onMouseLeave={() => setIsHoveredHeartIcon(false)}
                >
                  <AiFillHeart
                    size={"20px"}
                    style={{ color: "#1dd74c" }}
                    className="cursor-pointer me-[20px]"
                    onClick={function (e) {
                      removeSongFromLikedSongsFunc(song._id);
                    }}
                  />
                </div>
              ) : (
                <div
                  onMouseEnter={() => setIsHoveredHeartIcon(true)}
                  onMouseLeave={() => setIsHoveredHeartIcon(false)}
                  onClick={function (e) {
                    addSongToLikedSongsFunc(song._id);
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

              <div>{song.duration}</div>
              <div onClick={openVerticalNavigateMoreOptionsNew}>
                <IoIosMore size={20} color="white" className="cursor-pointer" />
              </div>
            </>
          ) : (
            <>
              {likedSongs?.includes(song._id) ? (
                <>
                  <div>
                    <AiFillHeart
                      size={"20px"}
                      style={{ color: "#1dd74c" }}
                      className="cursor-pointer me-[20px]"
                      onClick={function (e) {
                        removeSongFromLikedSongsFunc(song._id);
                      }}
                    />
                  </div>

                  <div>{song.duration}</div>
                  <div>
                    <IoIosMore size={20} color="white" />
                  </div>
                </>
              ) : (
                <>
                  <div className="me-[40px]">
                    <AiOutlineHeart
                      className="hidden "
                      size={20}
                      color="gray"
                    />
                  </div>
                  <div>{song.duration}</div>
                  <div>
                    <IoIosMore className="hidden" size={20} color="white" />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
