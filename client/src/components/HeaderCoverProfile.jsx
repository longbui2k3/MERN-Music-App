import { Avatar } from "@chakra-ui/react";
import React from "react";

export default function HeaderCoverProfile() {
  return (
    <div className="w-full mx-0 my-0.5 flex items-center gap-0.5 pl-[20px] pr-[20px] p-[20px]">
      <div className="image">
        <img
          className="h-60 shadow-2xl w-[200px] h-[200p] rounded-full mr-[16px]"
          src="https://bit.ly/broken-link"
          alt="Avatar"
        />
      </div>
      <div className="flex flex-col  text-gray-300">
        <span className="type">Profile</span>
        <h1 className="text-white text-[96px] font-bold">Name</h1>
        <div className="description">Description</div>
      </div>
    </div>
  );
}
