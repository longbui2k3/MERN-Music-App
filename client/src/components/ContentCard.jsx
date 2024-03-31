import React, { useState } from "react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { MdPauseCircleFilled } from "react-icons/md";

export default function ContentCard() {
  const [playClick, setPlayClick] = useState(false);

  const handlePlayClick = () => {
    setPlayClick((preState) => !preState);
  };

  const handleAddClick = () => {};

  const handleMoreClick = () => {};
  return (
    <>
      <div className="grid grid-cols-4 lg:w-[40%] md:w-[100%] gap-3">
        <div>
          <img
            alt="Dùng hết xuân thì để chờ nhau"
            src="https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f"
          />
        </div>
        <div className="col-span-3">
          <div>
            <p className="text-white text-1xl font-bold pb-2">
              <a href="#">Dành hết xuân thì để chờ nhau</a>
            </p>
            <p>
              <a href="#">Vũ</a>, <a href="#">Hà Anh Tuấn</a>
            </p>
          </div>
          <div className="text-white text-1xl font-bold pb-3 mt-2">
            <span>Đĩa đơn * 3 tuần trước</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center h-16">
              <div>
                <button onClick={handleAddClick}>
                  <GoPlusCircle size={35} />
                </button>
                <button className="ml-3" onClick={handleMoreClick}>
                  <IoIosMore size={32} />
                </button>
              </div>
              <div>
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
      <hr className="lg:w-[40%] md:w-[100%] border-t-2 border-gray-500 mt-3" />
    </>
  );
}
