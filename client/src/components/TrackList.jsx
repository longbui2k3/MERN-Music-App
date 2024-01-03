import React, { useEffect, useState } from "react";
import { AiFillClockCircle, AiOutlineHeart } from "react-icons/ai";
import ActionBar from "./ActionBar";
import HeaderCover from "./HeaderCover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { IoIosMore } from "react-icons/io";
import { SingerAPI } from "../api";
import { getPlaylist } from "../api/PlaylistAPI";
import { useParams } from "react-router-dom";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);
  const [likedSong, setLikedSong] = useState(null);
  let params = useParams();
  useEffect(() => {
    const getAllSongs = async () => {
      try {
        const songsData = await getPlaylist(params.id);
        for (const song of songsData.data.playlist.songs) {
          song.artistObject = (
            await SingerAPI.getSingerById(song.artist)
          ).data.singer;
        }
        setSongs(songsData.data.playlist.songs);
      } catch (err) {
        console.log(err);
      }
    };
    getAllSongs();
  }, []);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const handleClickOnRow = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <>
      <main>
        <HeaderCover />
        <div className="opacity-95 z-40">
          <ActionBar />
          <div className="px-12 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] text-gray-400 sticky top-[64px] bg-[#121212] py-4 transition duration-300 ease-in-out border-b border-current">
            <div>
              <span>#</span>
            </div>
            <div>
              <span>TITLE</span>
            </div>
            <div>
              <span>Album</span>
            </div>
            <div>
              <span>Added Date</span>
            </div>
            <div className="flex  items-center justify-center	">
              <span>
                <AiFillClockCircle />
              </span>
            </div>
          </div>

          {/* Song list */}
          <div className="mx-[2rem] flex flex-col pb-10 mt-[8px]">
            {songs.map(
              (
                { id, name, imageURL, artist, duration, album, artistObject },
                index
              ) => {
                return (
                  <div
                    className={`py-2 px-4 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] ${
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
                      className={`flex items-center  gap-2 overflow-hidden ${
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
                          {artistObject.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-[#dddcdc] overflow-hidden">
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        Hahahahaha
                      </span>
                    </div>
                    <div className="flex items-center text-[#dddcdc]">
                      <span>Ngay them</span>
                    </div>

                    <div className="flex items-center text-[#dddcdc] justify-center gap-[10%]">
                      {hoveredIndex === index ? (
                        <>
                          {likedSong === index ? (
                            <div
                              onMouseEnter={() => setIsHoveredHeartIcon(true)}
                              onMouseLeave={() => setIsHoveredHeartIcon(false)}
                              onClick={() => setLikedSong(null)}
                            >
                              <FontAwesomeIcon
                                icon={faHeart}
                                style={{ color: "#1dd74c" }}
                                className="text-[20px] cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div
                              onMouseEnter={() => setIsHoveredHeartIcon(true)}
                              onMouseLeave={() => setIsHoveredHeartIcon(false)}
                              onClick={() => setLikedSong(index)}
                            >
                              {isHoveredHeartIcon ? (
                                <AiOutlineHeart
                                  size={20}
                                  color="white"
                                  className="cursor-pointer"
                                />
                              ) : (
                                <AiOutlineHeart
                                  size={20}
                                  color="gray"
                                  className=" cursor-pointer"
                                />
                              )}
                            </div>
                          )}

                          <div>{msToMinutesAndSeconds(10000)}</div>
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
                          {likedSong === index ? (
                            <>
                              <div>
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  style={{ color: "#1dd74c" }}
                                  className="text-[20px] cursor-pointer"
                                />
                              </div>

                              <div>{msToMinutesAndSeconds(10000)}</div>
                              <div>
                                <IoIosMore size={20} color="white" />
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <AiOutlineHeart
                                  className="hidden"
                                  size={20}
                                  color="gray"
                                />
                              </div>
                              <div>{msToMinutesAndSeconds(10000)}</div>
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
