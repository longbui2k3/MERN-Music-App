import React, { useEffect, useState } from "react";
import { AiFillClockCircle, AiOutlineHeart } from "react-icons/ai";
import SongAPI from "../api/SongAPI";
import ActionBar from "./ActionBar";
import HeaderCover from "./HeaderCover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { IoIosMore } from "react-icons/io";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
            <div className="flex  items-center justify-end	">
              <span>
                <AiFillClockCircle />
              </span>
            </div>
            
          </div>

          {/* Song list */}
          <div className="mx-[2rem] flex flex-col pb-10">
            {songs.map(
              ({ id, name, imageURL, artists, duration, album }, index) => {
                return (
                  <div
                    className="py-2 px-4 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] hover:bg-[#000000b3]"
                    key={id}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex items-center text-[#dddcdc]">
                      {hoveredIndex === index ? (
                        <span>
                          <FontAwesomeIcon icon={faPlay} />
                        </span>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex items-center text-[#dddcdc] gap-4">
                      <div className="h-[40px]">
                        <img
                          className="w-[40px] h-[40px] rounded-[5px]"
                          src={imageURL}
                          alt="track"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="name text-white truncate max-w-[220px]">
                          {name}
                        </span>
                        <span>{artists}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-[#dddcdc]">
                      <span>Hahahahaha</span>
                    </div>
                    <div className="flex items-center text-[#dddcdc]">
                      <span>Ngay them</span>
                    </div>

                    <div className="flex items-center text-[#dddcdc] justify-end gap-[25px]">
                      {hoveredIndex === index ? (
                        <>
                          <div >
                            <AiOutlineHeart size={20} color="gray" />
                          </div>
                          <div >{msToMinutesAndSeconds(10000)}</div>
                        </>
                      ) : (
                        <>
                        <div><AiOutlineHeart className="hidden" size={20} color="gray" /></div>
                        <div className="ml-[20px]">{msToMinutesAndSeconds(10000)}</div>
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
