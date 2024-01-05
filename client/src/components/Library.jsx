import { Box, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  GoPlus,
  GoArrowRight,
  GoChevronLeft,
  GoChevronRight,
} from "react-icons/go";
import ExpandIcon from "./ExpandIcon";
import CollapseIcon from "./CollapseIcon";
import "../styles/searchbar.css";
import { useResizeDetector } from "react-resize-detector";
import VerticalNavigateCreateLibrary from "./VerticalNavigateCreateLibrary";
import VerticalNavigateViewModeLibrary from "./VerticalNavigateViewModeLibrary";
import { IoIosList } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoGridOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import "../styles/swiper.css";

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import { FaRegFolder } from "react-icons/fa6";
function useOutsideComponents(
  searchRef,
  createBtnRef,
  setIsOpenVNCreateNew,
  viewModeBtnRef,
  setIsOpenVNViewMode,
  libraryRef,
  setIsOpenVNCreate
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        document.querySelector(".search-input").style = "width: 0px;";
      }
      if (
        createBtnRef.current &&
        !createBtnRef.current.contains(event.target)
      ) {
        setIsOpenVNCreateNew(false);
      }
      if (
        viewModeBtnRef.current &&
        !viewModeBtnRef.current.contains(event.target)
      ) {
        setIsOpenVNViewMode(false);
      }
      if (libraryRef.current && !libraryRef.current.contains(event.target)) {
        setIsOpenVNCreate(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}

const Library = () => {
  const openSearchBar = (event) => {
    document.querySelector(".search-input").style = "width: 160px;";
  };
  const searchRef = useRef(null);

  const [isOpenVNCreateNew, setIsOpenVNCreateNew] = useState(false);
  const openVerticalNavigateCreateNew = (e) => {
    setIsOpenVNCreateNew(!isOpenVNCreateNew);
  };
  const createBtnRef = useRef(null);

  const [isOpenVNViewMode, setIsOpenVNViewMode] = useState(false);
  const openVerticalNavigateViewMode = (e) => {
    setIsOpenVNViewMode(!isOpenVNViewMode);
  };
  const viewModeBtnRef = useRef(null);
  const libraryRef = useRef(null);

  const { width, height, ref } = useResizeDetector();
  const [resizeStyle, setResizeStyle] = useState(false);
  useEffect(() => {
    if (width < 223) {
      setResizeStyle(true);
    } else {
      setResizeStyle(false);
    }
  }, [width]);
  const collapseSidebarFunc = () => {
    document.querySelector(".app-sidebar").style = "width: 93px";
  };
  const expandSidebarFunc = () => {
    document.querySelector(".app-sidebar").style = "width: 290px";
  };

  const [sortBy, setSortBy] = useState("Recents");
  const [viewAs, setViewAs] = useState("List");

  const headerListSongsRef = useRef(null);
  const listSongRef = useRef(null);

  const [isOpenVNCreate, setIsOpenVNCreate] = useState(false);
  const openVerticalNavigateCreate = (e) => {
    e.preventDefault();
    setIsOpenVNCreate(true);
  };
  const [mouse, setMouse] = useState({ left: 0, top: 0 });
  const closeVerticalNavigateCreate = (e) => {
    setMouse({ left: e.clientX, top: e.clientY });
    setIsOpenVNCreate(false);
  };

  useOutsideComponents(
    searchRef,
    createBtnRef,
    setIsOpenVNCreateNew,
    viewModeBtnRef,
    setIsOpenVNViewMode,
    libraryRef,
    setIsOpenVNCreate
  );

  return (
    <div
      className="h-full flex flex-col"
      onContextMenu={openVerticalNavigateCreate}
      onMouseDown={closeVerticalNavigateCreate}
      ref={libraryRef}
    >
      {isOpenVNCreate ? (
        <VerticalNavigateCreateLibrary
          leftPos={mouse.left}
          topPos={mouse.top}
          text1="Create playlist"
          icon2={<GoPlus className="my-auto text-[20px] me-3 text-white" />}
          text2="Create folder"
        />
      ) : (
        ""
      )}
      {isOpenVNCreateNew ? (
        <VerticalNavigateCreateLibrary
          leftPos={createBtnRef.current?.getBoundingClientRect().left}
          text1="Create a new playlist"
          icon2={<FaRegFolder className="my-auto text-[20px] me-3" />}
          text2="Create a new folder"
        />
      ) : (
        ""
      )}
      <VerticalNavigateViewModeLibrary
        leftPos={viewModeBtnRef.current?.getBoundingClientRect().left - 109}
        sortBy={sortBy}
        viewAs={viewAs}
        setSortBy={setSortBy}
        setViewAs={setViewAs}
        isHidden={!isOpenVNViewMode}
      />
      <div
        className={`relative overflow-x-hidden ${
          resizeStyle ? "h-[50px]" : "h-[100px]"
        }`}
        ref={ref}
        style={{
          minHeight: `${resizeStyle ? "0px" : "100px"}`,
        }}
      >
        <div className="flex justify-between">
          <Box marginTop={2} padding="4px 12px 4px 20px" className="flex">
            {!resizeStyle ? (
              <Tooltip
                label="Collapse Your Library"
                placement="top-end"
                bg="rgb(40,40,40)"
              >
                <div
                  className="library-label flex cursor-pointer text-[#b3b3b3]"
                  onClick={collapseSidebarFunc}
                  onMouseEnter={function () {
                    document.querySelector(".library-label svg").style.fill =
                      "white";
                    document.querySelector(".library-label").style.color =
                      "white";
                  }}
                  onMouseLeave={function () {
                    document.querySelector(".library-label svg").style.fill =
                      "#b3b3b3";
                    document.querySelector(".library-label").style.color =
                      "#b3b3b3";
                  }}
                >
                  <ExpandIcon className="fill-[#b3b3b3]" />
                  <span className={`ml-[15px] text-[16px] font-bold`}>
                    Your Library
                  </span>
                </div>
              </Tooltip>
            ) : (
              <Tooltip
                label="Expand Your Library"
                placement="right"
                bg="rgb(40,40,40)"
              >
                <div>
                  <CollapseIcon
                    onClick={expandSidebarFunc}
                    className={"fill-[#b3b3b3] hover:fill-white"}
                  />
                </div>
              </Tooltip>
            )}{" "}
          </Box>
          <div
            className={`mt-[8px] me-2 flex flex-row ${
              resizeStyle ? "hidden" : ""
            }`}
          >
            <Tooltip
              label="Create playlist or folder"
              placement="top"
              bg="rgb(40,40,40)"
            >
              <div
                className="flex flex-col justify-center hover:scale-[1.05] hover:bg-[rgb(35,35,35)] hover:text-white me-[10px] rounded-full p-1"
                onClick={openVerticalNavigateCreateNew}
                ref={createBtnRef}
              >
                <GoPlus
                  color="#b3b3b3"
                  size={"25px"}
                  style={{
                    background: "none",
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip label="Show more" placement="top" bg="rgb(40,40,40)">
              <div className="flex flex-col justify-center hover:scale-[1.05] hover:bg-[rgb(35,35,35)] hover:text-white me-[10px] rounded-full p-1">
                <GoArrowRight
                  color="#b3b3b3"
                  size={"25px"}
                  style={{
                    background: "none",
                  }}
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div
          className={`relative ms-2 me-4 mt-4 mb-2 z-50 ${
            resizeStyle ? "hidden" : ""
          }`}
        >
          <div className="swiper-button image-swiper-button-next">
            <GoChevronRight />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <GoChevronLeft />
          </div>
          <Swiper
            // navigation={true}
            spaceBetween={10}
            keyboard={true}
            slidesPerView={"auto"}
            freeMode={true}
            modules={[FreeMode, Navigation]}
            className={`mySwiper`}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
          >
            <SwiperSlide
              className="bg-[rgb(35,35,35)] py-1 px-3 text-white text-center rounded-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer"
              style={{
                width: "fit-content",
              }}
            >
              Playlists
            </SwiperSlide>
            <SwiperSlide
              className="bg-[rgb(35,35,35)] py-1 px-3 text-white text-center rounded-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer"
              style={{
                width: "fit-content",
              }}
            >
              Albums
            </SwiperSlide>
            <SwiperSlide
              className="bg-[rgb(35,35,35)] py-1 px-3 text-white text-center rounded-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer"
              style={{
                width: "fit-content",
              }}
            >
              Podcasts & Shows
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div
        className="grow relative"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className={`listsongs h-[100%] w-full absolute overflow-y-scroll`}>
          <div
            className={`flex justify-between ms-2 me-3 h-[40px] ${
              resizeStyle ? "hidden" : ""
            }`}
            ref={headerListSongsRef}
          >
            <div
              className="flex justify-center items-center rounded-lg relative mt-1 h-[30px] bg-[rgb(35,35,35)]"
              ref={searchRef}
            >
              <Tooltip
                label="Search in Your Library"
                placement="top-end"
                bg="rgb(40,40,40)"
              >
                <div
                  className="search-icon flex flex-col justify-center hover:bg-[rgb(35,35,35)] hover:text-white text-[#b3b3b3] px-1 py-1 relative z-10 rounded-full w-[30px] h-[30px] cursor-pointer"
                  onClick={openSearchBar}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ margin: "0px auto" }}
                  >
                    <path
                      d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                      stroke="#b3b3b3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </Tooltip>
              <input
                class={
                  "search-input rounded-r-lg text-[14px] text-[#b3b3b3] bg-[rgb(35,35,35)] p-[5px] w-0"
                }
                type="search"
                autocomplete="off"
                spellcheck="false"
                aria-live="polite"
                placeholder="Search in Your Library"
                style={{
                  transition: "width 0.1s ease-in-out",
                }}
              />
            </div>
            <div
              className="viewas flex justify-end rounded-full font-normal focus:outline-none cursor-pointer mt-[9px] me-[4px] text-[#b3b3b3] hover:text-white hover:fill-white"
              style={{
                background: "none",
                fontSize: "14px",
                minWidth: "0px",
              }}
              onClick={openVerticalNavigateViewMode}
              ref={viewModeBtnRef}
              onMouseEnter={function () {
                document.querySelector(".viewas svg").style.fill = "white";
                document.querySelector(".viewas").style.color = "white";
                document.querySelector(".viewas").style.transform =
                  "scale(1.05)";
              }}
              onMouseLeave={function () {
                document.querySelector(".viewas svg").style.fill = "#b3b3b3";
                document.querySelector(".viewas").style.color = "#b3b3b3";
                document.querySelector(".viewas").style.transform =
                  "scale(1.0)";
              }}
            >
              <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                {sortBy}
              </div>
              <div className="w-[23px]">
                {viewAs === "List" ? (
                  <IoIosList
                    size={20}
                    className="ms-[6px] mt-[1px] fill-[#b3b3b3]"
                  />
                ) : viewAs === "Compact" ? (
                  <HiOutlineBars3
                    size={20}
                    color="#b3b3b3"
                    className="ms-[6px] mt-[2px] fill-[#b3b3b3]"
                  />
                ) : viewAs === "Grid" ? (
                  <IoGridOutline
                    size={19}
                    color="#b3b3b3"
                    className="ms-[6px] mt-[2px] fill-[#b3b3b3]"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div>
            {[...Array(9)].map((x, i) => (
              <div class="flex gap-2 p-2 overflow-hidden text-[#b3b3b3] hover:bg-[rgb(35,35,35)] rounded-lg w-full ">
                <div class="h-[45px] w-[45px] " ref={listSongRef}>
                  <img
                    src="https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f"
                    alt="track"
                  />
                </div>
                <div
                  class={`listsong-info flex flex-col ${
                    resizeStyle ? "hidden" : ""
                  }`}
                >
                  <span class="whitespace-nowrap overflow-hidden text-ellipsis text-white">
                    Chìm Sâu
                  </span>
                  <span class="whitespace-nowrap overflow-hidden text-ellipsis">
                    Playlists • 9 songs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
