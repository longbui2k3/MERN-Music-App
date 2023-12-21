import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import SongAPI from "../api/SongAPI";
import ActionBar from "./ActionBar";
import HeaderCover from "./HeaderCover";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
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
            <div className="flex justify-center items-center">
              <span>
                <AiFillClockCircle />
              </span>
            </div>
          </div>
          {/* Song list */}
          <div className="mx-[2rem] flex flex-col pb-10">
            {songs.map(
              ({ id, name, image, artists, duration, album }, index) => {
                return (
                  <div
                    className="py-2 px-4 grid grid-cols-[0.2fr_2.5fr_2fr_1.5fr_1fr] hover:bg-[#000000b3]"
                    key={id}
                  >
                    <div className="flex items-center text-[#dddcdc]">
                      <span>{index + 1}</span>
                    </div>
                    <div className="flex items-center text-[#dddcdc] gap-2 overflow-hidden">
                      <div className="h-[40px] w-[15%]">
                        <img src={image} alt="track" />
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
                    <div className="flex items-center text-[#dddcdc] justify-center">
                      <span>{msToMinutesAndSeconds(10000)}</span>
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
