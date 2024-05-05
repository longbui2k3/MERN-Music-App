import React, { useState } from "react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { MdPauseCircleFilled } from "react-icons/md";
import { calculateDate } from "../utils/Date";
import { NavigateAuth } from "../context/NavigateContext";
import { Link } from "react-router-dom";

export default function ContentCard({ song }) {
  const { navigatePage } = NavigateAuth();
  const [playClick, setPlayClick] = useState(false);

  const handlePlayClick = () => {
    setPlayClick((preState) => !preState);
  };

  const handleAddClick = () => {};

  const handleMoreClick = () => {};
  return (
    <>
      <div
        className={`flex flex-row h-[212px] min-w-[550px] md:w-[40%] sm:w-full  gap-3 border-b-[1px] cursor-pointer border-slate-600 hover:border-none hover:bg-zinc-900`}
      >
        <div
          className="container h-2/3 w-1/4 text-center rounded"
          onClick={function (e) {
            navigatePage(`/playlist/${song._id}`);
          }}
        >
          <img alt={song.name} src={song.imageURL} className="w-full h-full" />
        </div>
        <div className="w-3/4">
          <div>
            <p className="text-white text-1xl font-bold py-2 hover:underline decoration-solid">
              <Link to={`/playlist/${song._id}`}>{song.name}</Link>
            </p>
            {song.writtenBy && (
              <p className="hover:text-white">{song.writtenBy}</p>
            )}
          </div>
          <div className="text-white text-1xl font-bold py-3 mt-2">
            <span>Đĩa đơn - {calculateDate(song.releasedDate)} ngày trước</span>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <div>
                <button onClick={handleAddClick}>
                  <GoPlusCircle size={35} />
                </button>
                <button className="ml-3" onClick={handleMoreClick}>
                  <IoIosMore size={32} />
                </button>
              </div>
              <div className="mr-[5px]">
                <button onClick={handlePlayClick}>
                  {!playClick ? (
                    <MdOutlinePlayCircleFilled size={40} color="white" />
                  ) : (
                    <MdPauseCircleFilled size={40} color="white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
