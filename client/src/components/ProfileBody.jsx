import { Image } from "@chakra-ui/react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getAllPlayListsByUserId } from "../api/PlaylistAPI";
import { IoIosMore } from "react-icons/io";

const MenuForMoreOptions = ({ isClickOnMoreIcon }) => {
  return (
    <div>
      {isClickOnMoreIcon ? (
        <nav className="absolute right-7 w-[200px] bg-[rgb(40,40,40)] z-50 rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden">
          <ul>
            <li className="flex justify-between px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer">
              Edit
            </li>
            <li className="px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer ">
              Copy link to profile
            </li>
            <div className="bg-[rgb(50,50,50)] mt-[1px] h-[1px]" />
          </ul>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};

const ProfileBody = ({ user }) => {
  const [playlists, setPlaylists] = useState();
  const [isClickOnMoreIcon, setIsClickOnMoreIcon] = useState(false);

  useEffect(() => {
    const getAllPlaylistsOfUser = async () => {
      try {
        const playlistsData = await getAllPlayListsByUserId(user._id);
        console.log(playlistsData);
        setPlaylists(playlistsData.data.playlists);
      } catch {}
    };
    getAllPlaylistsOfUser();
  }, []);
  return (
    <div
      style={{
        lineHeight: "64px",
        padding: "0 20px",
        maxHeight: "80%",
        overflow: "auto",
      }}
    >
      <br />
      <div onClick={() => setIsClickOnMoreIcon(!isClickOnMoreIcon)}>
        <IoIosMore size={30} className="hover:text-white cursor-pointer " />
      </div>
      <br />
      <div className="text-[24px] text-white font-semibold	">
        Public Playlists
      </div>
      {/* <div>
        {playlists.map((playlist, playlistIndex) => (
          <PlayListItem playlist={playlist} user={user} />
        ))}
      </div> */}
    </div>
  );
};

const PlayListItem = ({ playlist, user }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={
        "h-[270px] rounded-md w-[190px] inline-block cursor-pointer mr-[24px] mb-[24px]"
      }
      style={{ backgroundColor: "#181818" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          height: "100%",
          padding: "16px",
          position: "relative",
        }}
        className={"hover:bg-neutral-800 rounded-md"}
      >
        <div
          style={{
            position: "relative",
            height: "160px",
            width: "160px",
            transform: "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <Image
            boxSize="160px"
            objectFit="cover"
            src="https://misc.scdn.co/liked-songs/liked-songs-640.png"
            alt={playlist.name}
            className={"rounded-md"}
            style={{
              position: "absolute",
              //   boxShadow:
              //     "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
          />
          <FontAwesomeIcon
            icon={faCirclePlay}
            style={{
              color: "#3ae723",
              zIndex: "2",
              position: "absolute",
              bottom: "8px",
              right: "8px",
              //   boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              transform: `translateY(${isHovered ? "0" : "100%"})`,
              transition: "transform 0.3s ease, opacity 0.3s ease",
              opacity: isHovered ? 1 : 0,
            }}
            className={"text-[48px] hover:text-[50px] "}
          />
        </div>

        <div style={{ height: "70px", maxWidth: "158px" }}>
          <div
            style={{
              position: "relative",
              height: "100%",
            }}
          >
            <span
              className={"text-[15px] font-bold text-white "}
              style={{
                maxWidth: "158px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
              }}
            >
              {playlist.name}
            </span>
            <br />
            <span
              className={"text-[14px] font-medium hover:underline"}
              style={{
                maxWidth: "158px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
                margin: "-36px 0",
              }}
            >
              By {user.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileBody;
