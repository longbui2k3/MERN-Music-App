import React, { useEffect, useState } from "react";
import HeaderCover from "./HeaderCover";
import ActionBar from "./ActionBar";
import SongAPI from "../api/SongAPI";
import { AiFillClockCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getAlbumById } from "../api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { IoIosMore } from "react-icons/io";

export default function Album() {
  let params = useParams();
  const [songs, setSongs] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [likedSong, setLikedSong] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);

  useEffect(() => {
    const getAlbumFunc = async () => {
      const res = await getAlbumById(params.id);
      console.log(res);
      setSongs(res.data.metadata.album.songs);
    };
    getAlbumFunc();
  }, [params.id]);

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
      <HeaderCover type="Album" />
      <div className="opacity-95 z-40 bg-[#121212]">
        <ActionBar />
        <div className="mx-8 mb-3 grid grid-cols-[0.1fr_3.2fr_0.4fr] text-gray-400 top-[7.5vh] bg-[#121212] py-4 px-2.5 transition duration-300 ease-in-out border-b border-current">
          <div>
            <span className="px-[6px]">#</span>
          </div>
          <div>
            <span className="px-[5px]">Title</span>
          </div>
          <div className="flex justify-center items-center">
            <span>
              <AiFillClockCircle />
            </span>
          </div>
        </div>
        {/* Song list */}
        <div className="mx-[2rem] flex flex-col pb-10">
          {songs.map(
            ({ id, name, imageURL, singers, duration, album }, index) => {
              return (
                <div
                  className={`relative py-2 px-4 grid grid-cols-[0.1fr_3.2fr_0.4fr] hover:bg-[rgb(35,35,35)] rounded-md ${
                    selectedRow === index ? "" : "hover:bg-[#2a2929]"
                  } ${selectedRow === index ? "bg-[#5a5959]" : ""}`}
                  onClick={() => handleClickOnRow(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  key={id}
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
                    className={`flex items-center text-white gap-4 ${
                      playingIndex === index
                        ? "text-[#1dd74c]"
                        : "text-[#dddcdc]"
                    }`}
                  >
                    <div className="h-[40px] w-[40px]">
                      <img src={imageURL} alt="track" />
                    </div>
                    <div className="flex flex-col">
                      <span className="name">{name}</span>
                      <span>
                        {singers.map((singer) => singer.name).join(", ")}
                      </span>
                    </div>
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
                        {likedSong === index ? (
                          <>
                            <div>
                              <FontAwesomeIcon
                                icon={faHeart}
                                style={{ color: "#1dd74c" }}
                                className="text-[20px] cursor-pointer"
                              />
                            </div>

                            <div>{duration}</div>
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
    </>
  );
}
