import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { AiFillClockCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { useParams } from "react-router-dom";
import { SingerAPI, addSongToLikedSongs, getLikedSongsByUser, getMusicListsByUserId } from "../api";
import { getPlaylist } from "../api/PlaylistAPI";
import ActionBar from "./ActionBar";
import HeaderCover from "./HeaderCover";
import { dateDistance } from "../config";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
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
  }, [params.id]);
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
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getLikedSongsByUserFunc();
  }, []);

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
            {songs.map(
              (
                {
                  _id: playlistsong_id,
                  song: { _id, name, imageURL, singers, duration, album },
                  dateAdded,
                },
                index
              ) => {
                return (
                  <div
                    className={`py-2 px-4 grid grid-cols-[0.2fr_2.6fr_1.9fr_1.6fr_1fr] ${
                      selectedRow === index ? "" : "hover:bg-[#2a2929]"
                    } rounded-[5px] ${
                      selectedRow === index ? "bg-[#5a5959]" : ""
                    }`}
                    onClick={() => handleClickOnRow(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    key={index}
                  >
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
                        playingIndex === index
                          ? "text-[#1dd74c]"
                          : "text-[#dddcdc]"
                      }`}
                    >
                      <div className="h-[40px] w-[40px] ">
                        <img src={imageURL} alt="track" className="" />
                      </div>
                      <div className="flex flex-col w-[80%]">
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {singers.map((item) => item.name + " ").join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-[#dddcdc] overflow-hidden">
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {album.name}
                      </span>
                    </div>
                    <div className="flex items-center text-[#dddcdc]">
                      <span>{dateDistance(dateAdded)}</span>
                    </div>

                    <div className="flex items-center text-[#dddcdc] gap-[10%] ps-[34px]">
                      {hoveredIndex === index ? (
                        <>
                          {likedSongs?.includes(_id) ? (
                            <div>
                              <AiFillHeart
                                size={"20px"}
                                style={{ color: "#1dd74c" }}
                                className="cursor-pointer me-[20px]"
                              />
                            </div>
                          ) : (
                            <div
                              onMouseEnter={() => setIsHoveredHeartIcon(true)}
                              onMouseLeave={() => setIsHoveredHeartIcon(false)}
                              onClick={function (e) {
                                addSongToLikedSongs(_id);
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

                          <div>{duration}</div>
                          <div>
                            <IoIosMore
                              size={20}
                              color="white"
                              className="cursor-pointer"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          {likedSongs?.includes(_id) ? (
                            <>
                              <div onClick={function (e) {}}>
                                <AiFillHeart
                                  size={"20px"}
                                  style={{ color: "#1dd74c" }}
                                  className="cursor-pointer me-[20px]"
                                />
                              </div>

                              <div>{duration}</div>
                              <div>
                                <IoIosMore
                                  className="hidden"
                                  size={20}
                                  color="white"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                onClick={function (e) {
                                  addSongToLikedSongs(_id);
                                }}
                              >
                                <AiOutlineHeart
                                  className="hidden"
                                  size={20}
                                  color="gray"
                                />
                              </div>
                              <div>{duration}</div>
                              <div>
                                <IoIosMore
                                  className="hidden"
                                  size={20}
                                  color="white"
                                />
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </main>
    </>
  );
}
