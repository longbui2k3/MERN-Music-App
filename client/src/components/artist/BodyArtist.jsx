import React, { useEffect, useState } from "react";
import { SingerAPI } from "../../api";
import Section from "../Section";
import { GoPlus } from "react-icons/go";
import { AiFillClockCircle, AiOutlineHeart } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { IoIosMore } from "react-icons/io";
import { Tooltip } from "@chakra-ui/react";
import { NavigateAuth } from "../../context/NavigateContext";

const BodyArtist = () => {
  const [songs, setSongs] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [likedSong, setLikedSong] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);
  const { navigatePage } = NavigateAuth();
  useEffect(() => {
    const getSingerByUserFunc = async () => {
      try {
        const res = await SingerAPI.getSingerByUser();
        console.log(res.data.singer.songs);
        console.log(res.data.singer.listSongs);
        setSongs(res.data.singer.songs);
        const types = ["Album", "Playlist"];
        setSections(
          types.map(function (type) {
            return {
              title: type,
              listSongs: res.data.singer.listSongs
                .slice(0, 9)
                .filter((listSong) => listSong.type === type),
              create: true,
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getSingerByUserFunc();
  }, []);
  return (
    <>
      <div
        style={{
          lineHeight: "64px",
          padding: "0 20px",
          maxHeight: "80%",
          overflow: "none",
        }}
      >
        {sections.map((section) =>
          <Section section={section} />
        )}
        <div className="text-[#FFFFFF] font-bold text-[24px] flex justify-between items-center">
          <h2 className="cursor-pointer hover:underline">Songs</h2>
          <Tooltip
            label={`Create your song`}
            placement="top"
            bg="rgb(40,40,40)"
          >
            <div
              className="flex flex-col justify-center hover:scale-[1.05] bg-[rgb(35,35,35)] hover:text-white rounded-full p-1 w-[50px] h-[50px]"
              onClick={function (e) {
                navigatePage("/createSong");
              }}
            >
              <GoPlus
                color="#b3b3b3"
                size={"30px"}
                style={{
                  background: "none",
                  margin: "0px auto",
                }}
              />
            </div>
          </Tooltip>
        </div>
        <div className="opacity-95 z-40">
          <div className="px-12 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] text-gray-400 top-[64px] bg-[#121212] transition duration-300 ease-in-out border-b border-current">
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
          <div className="flex flex-col pb-10 mt-[8px] h-[400px] overflow-y-scroll">
            {songs.map(
              (
                { id, name, imageURL, singers, duration, album, releasedDate },
                index
              ) => {
                return (
                  <div
                    className={`py-2 px-4 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] ${
                      selectedRow === index ? "" : "hover:bg-[#2a2929]"
                    } rounded-[5px] ${
                      selectedRow === index ? "bg-[#5a5959]" : ""
                    }`}
                    // onClick={() => handleClickOnRow(index)}
                    // onMouseEnter={() => setHoveredIndex(index)}
                    // onMouseLeave={() => setHoveredIndex(null)}
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
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis leading-7">
                          {name}
                        </span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis leading-7">
                          {singers.map((item) => item.name + " ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-[#dddcdc] overflow-hidden">
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {/* {artistObject.name} */}
                      </span>
                    </div>
                    <div className="flex items-center text-[#dddcdc]">
                      <span>{releasedDate}</span>
                    </div>

                    <div className="flex items-center text-[#dddcdc] justify-center gap-[10%]">
                      {hoveredIndex === index ? (
                        <>
                          {likedSong === index ? (
                            <div
                              // onMouseEnter={() => setIsHoveredHeartIcon(true)}
                              // onMouseLeave={() => setIsHoveredHeartIcon(false)}
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
                              // onMouseEnter={() => setIsHoveredHeartIcon(true)}
                              // onMouseLeave={() => setIsHoveredHeartIcon(false)}
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

                          {/* <div>{msToMinutesAndSeconds(10000)}</div> */}
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

                              {/* <div>{msToMinutesAndSeconds(10000)}</div> */}
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
                              {/* <div>{msToMinutesAndSeconds(10000)}</div> */}
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
      </div>
    </>
  );
};

export default BodyArtist;
