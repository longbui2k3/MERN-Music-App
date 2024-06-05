import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";

const SearchSongList = ({ songs, removeTitle }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);
  const [likedSong, setLikedSong] = useState(null);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const handleClickOnRow = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <div className=" flex flex-col pb-[10px] w-full">
      {removeTitle ? (
        ""
      ) : (
        <h2 className="text-[white] text-[24px] my-[16px] font-bold">Songs</h2>
      )}
      {songs.map((song, index) => {
        return (
          <div
            className={`py-[6px] pe-3 grid grid-cols-[0.1fr_2.5fr_2fr_1.5fr_1fr] ${
              selectedRow === index ? "" : "hover:bg-[#2a2929]"
            } rounded-[5px] ${selectedRow === index ? "bg-[#5a5959]" : ""}`}
            onClick={() => handleClickOnRow(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={index}
          >
            <div className="relative flex items-center text-[#dddcdc]">
              {hoveredIndex === index ? (
                <span className="absolute">
                  {playingIndex === index ? (
                    <FontAwesomeIcon
                      className="ms-6"
                      icon={faPause}
                      onClick={() => setPlayingIndex(null)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="ms-6"
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
                      className="ms-6"
                      onClick={() => setPlayingIndex(null)}
                      color="#1dd74c"
                    />
                  ) : (
                    <span></span>
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
                <img src={song?.imageURL} alt="track" className="" />
              </div>
              <div className="flex flex-col w-[80%]">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[15px] font-semibold">
                  {song?.name}
                </span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[15px] font-semibold">
                  {song?.singers?.map((item) => item.name).join(", ")}
                </span>
              </div>
            </div>
            <div className=""> </div>
            <div className=""> </div>
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

                  <div>{song.duration}</div>
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

                      <div>{song.duration}</div>
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
        );
      })}
    </div>
  );
};

export default SearchSongList;
