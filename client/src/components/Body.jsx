import {
  Box,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import {
  faCircleChevronRight,
  faCirclePlay,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import SingerAPI from "../api/SingerAPI";
import SongAPI from "../api/SongAPI";

const Body = () => {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const getAllSongs = async () => {
      const songsData = await SongAPI.getAllSong();
      setSongs(songsData.data.data);
    };
    getAllSongs();
  }, []);
  return (
    <>
      <header className={"h-[64px]"}>
        <Box
          display="inline-block"
          style={{ lineHeight: "64px", padding: "0 20px " }}
        >
          <Tooltip label="Go back">
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              rotation={180}
              size="xl"
              className={"hover:text-white cursor-pointer"}
            />
          </Tooltip>

          <Tooltip label="Go forward">
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              size="xl"
              style={{ marginLeft: "16px" }}
              className={"hover:text-white cursor-pointer"}
            />
          </Tooltip>
        </Box>

        <div className="float-right mr-[20px]" style={{ lineHeight: "64px" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={
                <FontAwesomeIcon icon={faUser} className="text-[#b3b3b3]" />
              }
              variant="outline"
            />
            <MenuList style={{ backgroundColor: "#333", fontSize: "14px" }}>
              <MenuItem style={{ backgroundColor: "#333", height: "32px" }}>
                Profile
              </MenuItem>

              <MenuDivider />

              <MenuItem style={{ backgroundColor: "#333", height: "32px" }}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </header>
      {/* Body */}
      <div
        style={{
          lineHeight: "64px",
          padding: "0 20px",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        {/* Recently played section */}
        <div>
          <p className={"text-[22px] text-white"}>Recently played</p>

          {/* <div
              className={
                "grid gap-4 lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2"
              }
              > */}

          <div>
            {songs.map((song, index) => (
              <SongListItem key={index} song={song} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const SongListItem = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [artist, setArtist] = useState("");
  useEffect(() => {
    const getArtist = async () => {
      const artistData = await SingerAPI.getSingerById(song.artist);
      setArtist(artistData.data.singer);
    };
    getArtist();
  }, []);
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
            src={song.imageURL}
            alt={song.name}
            className={"rounded-md"}
            style={{
              position: "absolute",
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
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
              boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
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
              {song.name}
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
              {artist.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Body;
