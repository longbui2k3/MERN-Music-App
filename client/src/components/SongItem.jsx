import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";

export default function SongItem({ song, index }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [likedSong, setLikedSong] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);
  // const msToMinutesAndSeconds = (ms) => {
  //   const minutes = Math.floor(ms / 60000);
  //   const seconds = ((ms % 60000) / 1000).toFixed(0);
  //   return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  // };

  const handleClickOnRow = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };
  return (
    <div
      className={`relative py-2 px-4 grid grid-cols-[0.1fr_3.2fr_0.4fr] hover:bg-[rgb(35,35,35)] rounded-md ${
        selectedRow === index ? "" : "hover:bg-[#2a2929]"
      } ${selectedRow === index ? "bg-[#5a5959]" : ""}`}
      onClick={() => handleClickOnRow(index)}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      key={song._id}
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
              <IoIosMore size={20} color="white" className="cursor-pointer" />
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
                  <AiOutlineHeart className="hidden" size={20} color="gray" />
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
}
