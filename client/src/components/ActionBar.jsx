import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";

export default function ActionBar() {
  return (
    <div className="flex items-center place-content-between opacity-75 z-40 bg-[#121212] pt-4">
      <div className="flex items-center justify-center gap-x-1 ml-6">
        <span>
          <AiFillPlayCircle size={70} color="#1ED760" />
        </span>
        <span className="px-5">
          <AiOutlineHeart size={50} color="grey" />
        </span>
        <span>
          <IoIosMore size={30} color="gray" />
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
