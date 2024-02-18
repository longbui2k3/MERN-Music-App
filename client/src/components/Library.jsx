import { Box, Button, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  GoPlus,
  GoArrowRight,
  GoChevronLeft,
  GoChevronRight,
  GoArrowLeft,
} from "react-icons/go";
import ExpandIcon from "./ExpandIcon";
import CollapseIcon from "./CollapseIcon";
import "../styles/searchbar.css";
import { useResizeDetector } from "react-resize-detector";
import VerticalNavigateCreateLibrary from "./VerticalNavigateCreateLibrary";
import VerticalNavigateViewModeLibrary from "./VerticalNavigateViewModeLibrary";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiMusic2Line } from "react-icons/ri";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import "../styles/swiper.css";

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import { FaRegFolder } from "react-icons/fa6";
import SearchBarLibrary from "./SearchBarLibrary";
import ViewModeLibrary from "./ViewModeLibrary";
import { getMusicListsByUserId, getUser } from "../api";
import { NavigateAuth } from "../context/NavigateContext";
import { useSelector } from "react-redux";
import { dateDistance } from "../config";
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
  const [resizeStyle, setResizeStyle] = useState("2");
  useEffect(() => {
    if (width < 223) {
      setResizeStyle("1");
    } else if (width < 570) {
      setResizeStyle("2");
    } else {
      setResizeStyle("3");
    }
  }, [width]);
  const collapseSidebarFunc = () => {
    document.querySelector(".app-sidebar").style = "width: 93px";
    setResizeStyle("1");
  };
  const expandSidebarFunc = () => {
    document.querySelector(".app-sidebar").style = "width: 360px";
    setResizeStyle("2");
  };

  const [sortBy, setSortBy] = useState("Recents");
  const [viewAs, setViewAs] = useState("List");

  const headerMusicListRef = useRef(null);
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

  function showMoreClick() {
    setResizeStyle("3");
    document.querySelector(".app-sidebar").style = "width: 600px";
  }
  function showLessClick() {
    setResizeStyle("2");
    document.querySelector(".app-sidebar").style = "width: 360px";
  }
  const [musicLists, setMusicLists] = useState(false);
  const [types, setTypes] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState({
    oldType: "",
    oldIndex: -1,
    newType: "",
    newIndex: -1,
  });
  useEffect(() => {
    const getMusicListsByType = async () => {
      try {
        const res = await getMusicListsByUserId({
          musiclist_type: typeSearch.newType,
          search: inputSearch,
        });
        if (res.data.status === 200) {
          setMusicLists(res.data.metadata.musicLists);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (document.querySelectorAll(".swiper__slide").length !== 0) {
      if (typeSearch.oldIndex !== -1) {
        document.querySelectorAll(".swiper__slide")[
          typeSearch.oldIndex
        ].style.background = "rgb(35,35,35)";
        document.querySelectorAll(".swiper__slide")[
          typeSearch.oldIndex
        ].style.color = "white";
      }
      if (typeSearch.newIndex !== -1) {
        document.querySelectorAll(".swiper__slide")[
          typeSearch.newIndex
        ].style.background = "white";
        document.querySelectorAll(".swiper__slide")[
          typeSearch.newIndex
        ].style.color = "rgb(35,35,35)";
      }

      getMusicListsByType();
    }
  }, [typeSearch]);
  const userGlobal = useSelector((state) => state.user.user);
  useEffect(() => {
    if (userGlobal) setMusicLists(userGlobal.musicLists);
  }, [userGlobal]);
  useEffect(() => {
    const getMusicListByUser = async () => {
      try {
        const res = await getUser();
        console.log(res.data.metadata.user);
        if (res.data.status === 200) {
          const lists = res.data.metadata.user.musicLists;
          setMusicLists(lists);
          setTypes(
            lists
              .map((list) => list.musicList.type)
              .filter(
                (value, index) =>
                  lists.map((list) => list.musicList.type).indexOf(value) ===
                  index
              )
          );
        } else setMusicLists([]);
      } catch (error) {
        console.log(error);
      }
    };
    getMusicListByUser();
  }, []);
  useEffect(() => {
    if (musicLists.length === 0) {
      document.querySelector(".app-sidebar").style.minWidth = "340px;";
    } else {
      document.querySelector(".app-sidebar").style.minWidth = "90px;";
    }
  }, [musicLists]);

  const { navigatePage } = NavigateAuth();

  return (
    <div
      className={`h-full flex flex-col`}
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
          musicLists={musicLists}
          setMusicLists={setMusicLists}
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
          musicLists={musicLists}
          setMusicLists={setMusicLists}
        />
      ) : (
        ""
      )}
      <VerticalNavigateViewModeLibrary
        leftPos={viewModeBtnRef.current?.getBoundingClientRect().left - 107}
        sortBy={sortBy}
        viewAs={viewAs}
        setSortBy={setSortBy}
        setViewAs={setViewAs}
        isHidden={!isOpenVNViewMode}
        top={resizeStyle === "3" ? "235" : "280"}
      />
      <div
        className={`relative overflow-x-hidden ${
          musicLists.length !== 0
            ? resizeStyle === "1"
              ? "h-[50px]"
              : resizeStyle === "3"
              ? viewAs === "Grid"
                ? "h-[130px]"
                : "h-[195px]"
              : "h-[130px]"
            : ""
        }`}
        ref={ref}
        style={{
          minHeight: `${resizeStyle === "1" ? "0px" : "60px"}`,
        }}
      >
        <div className="flex justify-between">
          <Box marginTop={2} padding="4px 12px 4px 20px" className="flex">
            {!(resizeStyle === "1") ? (
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
              resizeStyle === "1" ? "hidden" : ""
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
            {resizeStyle !== "3" ? (
              <Tooltip label="Show more" placement="top" bg="rgb(40,40,40)">
                <div className="flex flex-col justify-center hover:scale-[1.05] hover:bg-[rgb(35,35,35)] hover:text-white me-[10px] rounded-full p-1">
                  <GoArrowRight
                    color="#b3b3b3"
                    size={"25px"}
                    style={{
                      background: "none",
                    }}
                    onClick={showMoreClick}
                  />
                </div>
              </Tooltip>
            ) : (
              <Tooltip label="Show less" placement="top" bg="rgb(40,40,40)">
                <div className="flex flex-col justify-center hover:scale-[1.05] hover:bg-[rgb(35,35,35)] hover:text-white me-[10px] rounded-full p-1">
                  <GoArrowLeft
                    color="#b3b3b3"
                    size={"25px"}
                    style={{
                      background: "none",
                    }}
                    onClick={showLessClick}
                  />
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        {musicLists.length !== 0 ? (
          <>
            <div className="flex justify-between">
              <div
                className={`relative ms-2 me-4 mt-4 mb-2 z-50 ${
                  resizeStyle === "1" ? "hidden" : ""
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
                  {types.map((type, i) => (
                    <SwiperSlide
                      className="swiper__slide bg-[rgb(35,35,35)] py-1 px-3 text-white text-center text-[14px] font-semibold rounded-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer"
                      style={{
                        width: "fit-content",
                      }}
                      onClick={function (e) {
                        if (typeSearch.newType !== type)
                          setTypeSearch({
                            oldType: typeSearch.newType,
                            oldIndex: typeSearch.newIndex,
                            newType: type,
                            newIndex: i,
                          });
                        else {
                          setTypeSearch({
                            oldType: typeSearch.newType,
                            oldIndex: typeSearch.newIndex,
                            newType: "",
                            newIndex: -1,
                          });
                        }
                      }}
                    >
                      {type}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div
                className={`flex mt-3 ms-2 me-3 h-[40px] ${
                  !(resizeStyle === "3") ? "hidden" : ""
                }`}
                ref={headerMusicListRef}
              >
                {resizeStyle === "3" ? (
                  <SearchBarLibrary
                    searchRef={searchRef}
                    setMusicLists={setMusicLists}
                    inputSearch={inputSearch}
                    setInputSearch={setInputSearch}
                    typeSearch={typeSearch}
                  />
                ) : (
                  ""
                )}
                {resizeStyle === "3" ? (
                  <ViewModeLibrary
                    openVerticalNavigateViewMode={openVerticalNavigateViewMode}
                    viewModeBtnRef={viewModeBtnRef}
                    sortBy={sortBy}
                    viewAs={viewAs}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className={`mx-2 mt-2 ${
                resizeStyle === "3" && viewAs !== "Grid" ? "" : "hidden"
              }`}
            >
              <ul className="flex font-semibold text-[13px]">
                <li className="basis-[50%]">Title</li>
                <li className="basis-[40%]">Date Added</li>
                <li className="basis-[10%]">Played</li>
              </ul>
              <div className="mt-2 h-[1px] w-[100%] border-t-[1px] border-[rgb(40,40,40)]"></div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {musicLists.length === 0 && (!inputSearch || !typeSearch) ? (
        <>
          <div className="h-[300px] min-w-[300px] bg-[rgb(40,40,40)] rounded-md ms-1 me-3 text-white pt-5 ps-5 mb-5">
            <p className="font-semibold text-[17px] mb-2">
              Create your first playlist
            </p>
            <p className="font-semibold text-[15px] mb-2">
              It's easy, we'll help you
            </p>
            <Button
              className="w-[130px] text-white hover:bg-[rgb(35,35,35)] hover:scale-[1.05] focus:outline-none mt-3"
              style={{
                borderRadius: "30px",
                height: "30px",
                fontSize: "15px",
                fontWeight: "semibold",
              }}
            >
              Create Playlist
            </Button>
          </div>
          <div className="h-[300px] min-w-[300px] bg-[rgb(40,40,40)] rounded-md ms-1 me-3 text-white pt-5 ps-5">
            <p className="font-semibold text-[17px] mb-2">
              Let's find some podcasts to follow
            </p>
            <p className="font-semibold text-[15px] mb-2">
              We'll keep you updated on new episodes
            </p>
            <Button
              className="w-[130px] text-white hover:bg-[rgb(35,35,35)] hover:scale-[1.05] focus:outline-none mt-3"
              style={{
                borderRadius: "30px",
                height: "30px",
                fontSize: "15px",
                fontWeight: "semibold",
              }}
            >
              Browse podcasts
            </Button>
          </div>
        </>
      ) : (
        ""
      )}

      <div
        className="grow relative"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className={`MusicList h-[100%] w-full absolute overflow-y-scroll`}>
          {musicLists.length !== 0 || (inputSearch && typeSearch) ? (
            <div
              className={`flex justify-between ms-2 me-3 h-[40px] ${
                resizeStyle !== "2" ? "hidden" : ""
              }`}
              ref={headerMusicListRef}
            >
              {resizeStyle === "2" ? (
                <SearchBarLibrary
                  searchRef={searchRef}
                  setMusicLists={setMusicLists}
                  inputSearch={inputSearch}
                  setInputSearch={setInputSearch}
                  typeSearch={typeSearch}
                />
              ) : (
                ""
              )}
              {resizeStyle === "2" ? (
                <ViewModeLibrary
                  openVerticalNavigateViewMode={openVerticalNavigateViewMode}
                  viewModeBtnRef={viewModeBtnRef}
                  sortBy={sortBy}
                  viewAs={viewAs}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div className="mt-3">
            {viewAs === "Grid" && resizeStyle !== "1" ? (
              <div
                className="flex flex-wrap gap-2 content-start"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(calc(10% - 1rem), 1fr))",
                  gridAutoFlow: "row dense",
                }}
              >
                {musicLists
                  ? musicLists.map((musicList, i) => (
                      <Tooltip
                        label={
                          <>
                            <div class="whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
                              {musicList.musicList.name}
                            </div>
                            <div class="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px] text-[#b3b3b3]">
                              {musicList.musicList.type} •{" "}
                              {musicList.musicList.songs.length} songs
                            </div>
                          </>
                        }
                        placement="right"
                        bg="rgb(40,40,40)"
                      >
                        <div
                          className="rounded-md overflow-hidden w-[100px] h-[100px] grow bg-[rgb(40,40,40)] flex flex-col justify-center"
                          ref={listSongRef}
                          style={{
                            minWidth: "calc(10% - 1em)",
                            maxWidth: "100px",
                            maxHeight: "100px",
                          }}
                        >
                          {musicList.musicList.imageURL ? (
                            <img
                              src={musicList.musicList.imageURL}
                              alt="track"
                            />
                          ) : (
                            <RiMusic2Line className="text-[40px] mx-auto" />
                          )}
                        </div>
                      </Tooltip>
                    ))
                  : ""}
              </div>
            ) : musicLists ? (
              musicLists.map((musicList, i) => (
                <Tooltip
                  label={
                    <>
                      <div class="whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
                        {musicList.musicList.name}
                      </div>
                      <div class="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px] text-[#b3b3b3]">
                        {musicList.musicList.type} •{" "}
                        {musicList.musicList.songs?.length} songs
                      </div>
                    </>
                  }
                  placement="right"
                  bg="rgb(40,40,40)"
                  isDisabled={resizeStyle === "1" ? false : true}
                >
                  <div
                    class={`gap-2 p-2 overflow-hidden cursor-pointer text-[#b3b3b3] font-semibold text-[14px] hover:bg-[rgb(35,35,35)] bg-[${
                      musicList.musicList._id ===
                      window.location.pathname.split("/")[2]
                        ? "rgb(35,35,35)"
                        : "#b3b3b3"
                    }] rounded-lg w-full `}
                    onClick={function (e) {
                      navigatePage(
                        `/${
                          musicList.musicList.type !== "LikedSongs"
                            ? musicList.musicList.type.toLowerCase()
                            : "playlist"
                        }/${musicList.musicList._id}`
                      );
                    }}
                  >
                    <div className="flex w-full">
                      {viewAs === "List" || resizeStyle === "1" ? (
                        <div
                          className={`flex ${
                            resizeStyle === "1" ? "justify-center" : ""
                          } w-full ${
                            resizeStyle === "3" ? "basis-[50%]" : "grow"
                          }`}
                        >
                          <div
                            class="h-[45px] w-[45px] flex flex-col justify-center bg-[rgb(40,40,40)] rounded-md overflow-hidden"
                            ref={listSongRef}
                          >
                            {musicList.musicList.imageURL ? (
                              <img
                                src={musicList.musicList.imageURL}
                                alt="track"
                              />
                            ) : (
                              <RiMusic2Line className="text-[30px] mx-auto" />
                            )}
                          </div>
                          <div
                            class={`listsong-info ms-3 grow flex flex-col overflow-hidden ${
                              resizeStyle === "1" ? "hidden" : ""
                            }`}
                            style={{
                              maxWidth: `${
                                resizeStyle === "3" ? "200px" : "100%"
                              }`,
                            }}
                          >
                            <span class="whitespace-nowrap overflow-hidden text-ellipsis text-white">
                              {musicList.musicList.name}
                            </span>
                            <span class="whitespace-nowrap overflow-hidden text-ellipsis">
                              {musicList.musicList.type} •{" "}
                              {musicList.musicList.type === "Album"
                                ? musicList.musicList.musiclist_attributes.singers
                                    ?.map((singer) => singer.name)
                                    .join(", ")
                                : musicList.musicList.musiclist_attributes?.user
                                    ._id}
                            </span>
                          </div>
                        </div>
                      ) : viewAs === "Compact" &&
                        (resizeStyle === "2" || resizeStyle === "3") ? (
                        <div
                          className={`w-full ${
                            resizeStyle === "3" ? "basis-[50%]" : "grow"
                          }`}
                        >
                          <div
                            class={`listsong-info grow flex overflow-hidden ${
                              resizeStyle === "1" ? "hidden" : ""
                            }`}
                            style={{
                              maxWidth: `${
                                resizeStyle === "3" ? "200px" : "100%"
                              }`,
                            }}
                          >
                            <span class="whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
                              {musicList.musicList.name}
                            </span>
                            <span class="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px]">
                              • {musicList.musicList.type}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div
                        className={`my-auto w-[92px] basis-[22%] ${
                          resizeStyle !== "3" ? "hidden" : ""
                        }`}
                      >
                        {dateDistance(musicList.dateAdded)}
                      </div>
                      <div
                        className={`my-auto w-[92px] basis-[26%] text-right ${
                          resizeStyle !== "3" ? "hidden" : ""
                        }`}
                      >
                        {dateDistance(musicList.datePlayed)}
                      </div>
                    </div>
                  </div>
                </Tooltip>
              ))
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
