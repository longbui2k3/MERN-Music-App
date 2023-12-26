import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";

export default function ActionBar() {
  const [isHeartHover, setIsHeartHover] = useState(false);
  const [isMoreHover, setIsMoreHover] = useState(false);

  function handleHeartHover() {
    setIsHeartHover(true);
  }

  function handleHeartHoverOut() {
    setIsHeartHover(false);
  }

  function handleMoreHover() {
    setIsMoreHover(true);
  }

  function handleMoreHoverOut() {
    setIsMoreHover(false);
  }
  return (
    <div className="flex items-center place-content-between opacity-75 z-40 bg-[#121212] pt-4">
      <div className="flex items-center justify-center gap-x-1 ml-6">
        <span className="transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer">
          <AiFillPlayCircle color="#1ED760" size={65} />
        </span>
        <span
          className="px-5 cursor-pointer"
          onMouseOver={handleHeartHover}
          onMouseOut={handleHeartHoverOut}
        >
          <AiOutlineHeart size={40} color={isHeartHover ? "white" : "grey"} />
        </span>
        <span
          className="cursor-pointer"
          onMouseOver={handleMoreHover}
          onMouseOut={handleMoreHoverOut}
        >
          <IoIosMore size={30} color={isMoreHover ? "white" : "grey"} />
        </span>
      </div>
      <div className="flex items-center justify-center gap-x-5 mr-10">
        <span>Option List</span>
        <span>
          <CgDetailsMore color="gray" size={30} />
        </span>
      </div>
    </div>
  );
}
