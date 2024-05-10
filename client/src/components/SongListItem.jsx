import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingerAPI from "../api/SingerAPI";
import { NavigateAuth } from "../context/NavigateContext";

export default function SongListItem({ musicList }) {
  const [isHovered, setIsHovered] = useState(false);
  const [artists, setArtists] = useState([]);
  const { navigatePage } = NavigateAuth();
  useEffect(() => {
    try {
      const getSingers = async () => {
        if (musicList.type === "Album") {
          for (
            let i = 0;
            i < musicList.musiclist_attributes.singers.length;
            i++
          ) {
            const singerData = await SingerAPI.getSingerById(
              musicList.musiclist_attributes.singers[i]
            );
            setArtists((preData) => [
              ...preData,
              singerData.data.metadata.singer.name,
            ]);
          }
        } else if (musicList.type === "Playlist") {
          setArtists(["Spotifree"]);
        }
      };

      getSingers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      className={"rounded-md cursor-pointer mb-[24px] grow aspect-[0.75]"}
      style={{ backgroundColor: "#181818", minWidth: "150px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (musicList.type === "Album") navigatePage(`/album/${musicList._id}`);
        else navigatePage(`/playlist/${musicList._id}`);
      }}

    >
      <div
        style={{
          height: "100%",
          padding: "16px",
          position: "relative",
        }}
        className={
          "hover:bg-neutral-800 rounded-md flex flex-col justify-between"
        }
      >
        <div
          style={{
            position: "relative",
            height: "160px",
            width: "100%",
            transform: "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <Image
            // boxSize="160px"
            objectFit="cover"
            src={musicList.imageURL}
            alt={musicList.name}
            className={"rounded-md aspect-square"}
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

        <div className="mb-[10px]">
          <div
            style={{
              position: "relative",
              // height: "100%",
            }}
          >
            <div
              className={"text-[15px] font-bold text-white "}
              style={{
                // maxWidth: "158px",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
                padding: 0,
              }}
            >
              {musicList.name}
            </div>
            <br />
            <div
              className={"text-[14px] font-medium hover:underline"}
              style={{
                // maxWidth: "158px",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
                margin: "-36px 0",
              }}
            >
              {artists.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
