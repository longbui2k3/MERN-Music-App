import React, { useEffect, useState } from "react";
import { AiFillClockCircle, AiOutlineHeart } from "react-icons/ai";
import SongAPI from "../api/SongAPI";
import ActionBar from "./ActionBar";
import HeaderCover from "./HeaderCover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { IoIosMore } from "react-icons/io";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);
  const [likedSong, setLikedSong] = useState(null);
  useEffect(() => {
    const getAllSongs = async () => {
      const songsData = await SongAPI.getAllSong();
      setSongs(songsData.data.data);
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
  }

  return (
    <>
      <main>
        <HeaderCover />
        <div className="opacity-95 z-40">
          <ActionBar />
          <div className="mx-10 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] text-gray-400 sticky top-[7.5vh] bg-[#121212] py-4 px-2.5 transition duration-300 ease-in-out border-b border-current">
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
              ({ id, name, imageURL, artists, duration, album }, index) => {
                return (

                  <div
                  className={`py-2 px-4 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] ${selectedRow === index ? "" : "hover:bg-[#2a2929]"} rounded-[5px] ${selectedRow === index ? "bg-[#5a5959]" : ""}`}
                    onClick={() => handleClickOnRow(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
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
                        <span>{index + 1}</span>
                      )}
                    </div>

                    <div className="flex items-center text-[#dddcdc] gap-2 overflow-hidden">
                      <div className="h-[40px] w-[15%]">
                        <img src={imageURL} alt="track" />
                      </div>
                      <div className="flex flex-col w-[80%]">
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {artists}
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
                              <FontAwesomeIcon icon={faHeart} style={{color: "#1dd74c",}} className="text-[20px] cursor-pointer"/>
                           
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
                                  className=" cursor-pointer"
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
