import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingerAPI from "../api/SingerAPI";
import { NavigateAuth } from "../context/NavigateContext";

export default function SongListItem({ listSong }) {
  const [isHovered, setIsHovered] = useState(false);
  const [artists, setArtists] = useState([]);
  const { navigatePage } = NavigateAuth();
  useEffect(() => {
    try {
      const getSingers = async () => {
        for (let i = 0; i < listSong.singers.length; i++) {
          const singerData = await SingerAPI.getSingerById(listSong.singers[i]);
          setArtists((preData) => [...preData, singerData.data.singer.name]);
        }
      };

      getSingers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      className={
        "h-[270px] rounded-md w-[190px] inline-block cursor-pointer mb-[24px] "
      }
      style={{ backgroundColor: "#181818" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigatePage(`/album/${listSong._id}`);
      }}
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
            src={listSong.imageURL}
            alt={listSong.name}
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
              {listSong.name}
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
              {artists.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
