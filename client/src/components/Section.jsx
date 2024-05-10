import React, { useEffect, useRef, useState } from "react";
import SongListItem from "./SongListItem";
import { GoPlus } from "react-icons/go";
import { Tooltip } from "@chakra-ui/react";
import { NavigateAuth } from "../context/NavigateContext";
import ArtistItem from "./ArtistItem";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  openAddListsToSection,
  openEditFormSection,
  setSection,
} from "../features/editForm/editFormSlice";
export default function Section({ section }) {
  const { navigatePage } = NavigateAuth();
  const dispatch = useDispatch();
  const [columnCount, setColumnCount] = useState(6);
  const sidebarSize = useSelector((state) => state.resize.sidebarSize);
  const appContainerSize = useSelector(
    (state) => state.resize.appContainerSize
  );
  useEffect(() => {
    setColumnCount(Math.floor((appContainerSize - sidebarSize) / 230));
  }, [sidebarSize]);
  return (
    <section aria-label={section.title}>
      <div className="text-[#FFFFFF] font-bold text-[24px] flex justify-between items-center">
        <div className="flex">
          <h2
            className="cursor-pointer hover:underline"
            onClick={function (e) {
              navigatePage(`/section/${section._id}`);
            }}
          >
            {section.title}
          </h2>
          {section.edit ? (
            <div
              className="flex flex-col justify-center mx-4"
              onClick={function (e) {
                dispatch(openEditFormSection());
                dispatch(setSection(section));
              }}
            >
              <FiEdit
                className="text-[20px] text-white" // style={{}}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className="text-[#B3B3B3] text-[14px] cursor-pointer hover:underline"
          onClick={function (e) {
            navigatePage(`/section/${section._id}`);
          }}
        >
          Show All
        </div>
      </div>
      <div
        className="grid-songs grid gap-4 overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${columnCount},minmax(0,1fr))`,
          // gridAutoFlow: "row dense",
        }}
      >
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
                  if (section.type === "section") {
                    dispatch(setSection(section));
                    dispatch(openAddListsToSection());
                  } else navigatePage("/createAlbum");
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
        {section.lists?.map((item, index) =>
          item.type ? (
            <SongListItem key={index} musicList={item} />
          ) : (
            <ArtistItem singer={item} />
          )
        )}
      </div>
    </section>
  );
}
