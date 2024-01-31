import React, { useEffect, useState } from "react";
import HeaderCover from "./HeaderCover";
import ActionBar from "./ActionBar";
import SongAPI from "../api/SongAPI";
import { AiFillClockCircle } from "react-icons/ai";
import { getAlbumById } from "../api";
import { useParams } from "react-router-dom";

export default function Album() {
  let params = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getAlbumFunc = async () => {
      const res = await getAlbumById(params.id);
      console.log(res);
      setSongs(res.data.album.songs);
    };
    getAlbumFunc();
  }, []);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <>
      <HeaderCover />
      <div className="opacity-95 z-40 bg-[#121212]">
        <ActionBar />
        <div className="mx-10 grid grid-cols-[0.1fr_3.2fr_0.4fr] text-gray-400 top-[7.5vh] bg-[#121212] py-4 px-2.5 transition duration-300 ease-in-out border-b border-current">
          <div>
            <span>#</span>
          </div>
          <div>
            <span>TITLE</span>
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
                  className="py-2 px-4 grid grid-cols-[0.1fr_3.2fr_0.4fr] hover:bg-[#000000b3]"
                  key={id}
                >
                  <div className="flex items-center text-[#dddcdc]">
                    <span>{index + 1}</span>
                  </div>
                  <div className="flex items-center text-[#dddcdc] gap-4">
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
                  <div className="flex items-center text-[#dddcdc] justify-center">
                    <span>{msToMinutesAndSeconds(10000)}</span>
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
