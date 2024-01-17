import { faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function HeaderCoverProfile({ user }) {
  const [isHoverAvatar, setIsHoverAvatar] = useState(false);

  return (
    <div className="w-full mx-0 my-0.5 flex items-center gap-0.5 pl-[20px] pr-[20px] p-[20px]">
      <div
        className="image  shadow-2xl w-[200px] h-[200px] rounded-full mr-[16px] relative bg-[#333] flex items-center justify-center"
        onMouseEnter={() => setIsHoverAvatar(true)}
        onMouseLeave={() => setIsHoverAvatar(false)}
      >
        {isHoverAvatar ? (
          <>
            <FontAwesomeIcon
              icon={faPen}
              className="absolute  text-[48px] w-[100%] text-white"
              style={{ margin: "auto auto" }}
            />
            <p className="text-white mt-[40%]">Choose a photo</p>
          </>
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="absolute  text-[48px] w-[100%]"
            style={{ margin: "auto auto" }}
          />
        )}
      </div>
      <div className="flex flex-col  text-gray-300">
        <span className="type">Profile</span>
        <h1 className="text-white text-[96px] font-bold">{user?.name}</h1>
        <div className="description">Description</div>
      </div>
    </div>
  );
}
