import React from "react";
import SongListItem from "./SongListItem";
import { GoPlus } from "react-icons/go";
import { Tooltip } from "@chakra-ui/react";
import { NavigateAuth } from "../context/NavigateContext";

export default function Section({ section }) {
  const { navigatePage } = NavigateAuth();
  return (
    <section aria-label={section.title}>
      <div className="text-[#FFFFFF] font-bold text-[24px] flex justify-between items-center">
        <h2 className="cursor-pointer hover:underline">{section.title}</h2>
        <div className="text-[#B3B3B3] text-[14px] cursor-pointer hover:underline">
          Show All
        </div>
      </div>
      <div className="flex gap-4 flex-wrap overflow-hidden">
        {section.create ? (
          <div
            className={
              "h-[270px] rounded-md w-[190px] flex flex-col justify-center cursor-pointer mb-[24px]"
            }
            style={{ backgroundColor: "#181818" }}
          >
            <Tooltip
              label={`Create your ${section.title}`}
              placement="top"
              bg="rgb(40,40,40)"
            >
              <div
                className="flex flex-col justify-center hover:scale-[1.05] bg-[rgb(35,35,35)] hover:text-white rounded-full p-1 w-[100px] h-[100px] mx-auto"
                onClick={function (e) {
                  navigatePage("/createAlbum");
                }}
              >
                <GoPlus
                  color="#b3b3b3"
                  size={"50px"}
                  style={{
                    background: "none",
                    margin: "0px auto",
                  }}
                />
              </div>
            </Tooltip>
          </div>
        ) : (
          ""
        )}
        {section.listSongs.map((item, index) => (
          <SongListItem key={index} listSong={item} />
        ))}
      </div>
    </section>
  );
}
