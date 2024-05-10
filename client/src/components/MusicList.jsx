import { RiMusic2Line } from "react-icons/ri";
import { NavigateAuth } from "../context/NavigateContext";
import { dateDistance } from "../config";
import { Tooltip } from "@chakra-ui/react";

export default function MusicList({
  item,
  resizeStyle,
  viewAs,
  listSongRef,
  level,
}) {
  const { navigatePage } = NavigateAuth();
  return (
    <Tooltip
      //   key={i}
      label={
        <>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
            {item?.musicList?.name}
          </div>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px] text-[#b3b3b3]">
            {item.musicList?.type} • {item.musicList?.songs?.length} songs
          </div>
        </>
      }
      placement="right"
      bg="rgb(40,40,40)"
      isDisabled={resizeStyle === "1" ? false : true}
    >
      <div
        className={`gap-2 p-2 overflow-hidden cursor-pointer text-[#b3b3b3] font-semibold text-[14px] hover:bg-[rgb(35,35,35)] bg-[${
          item.musicList?._id === window.location.pathname.split("/")[2]
            ? "rgb(35,35,35)"
            : "#b3b3b3"
        }] rounded-lg `}
        onClick={function (e) {
          navigatePage(
            `/${
              item.musicList.type !== "LikedSongs"
                ? item.musicList.type.toLowerCase()
                : "playlist"
            }/${item.musicList._id}`
          );
        }}
        style={{
          marginLeft: level ? `${15 * (level - 1)}px` : "0px",
        }}
      >
        <div
          className={`flex ${
            resizeStyle === "3" ? "flex-row-reverse" : ""
          } w-full`}
        >
          {viewAs === "List" || resizeStyle === "1" ? (
            <div
              className={`flex order-3 ${
                resizeStyle === "1" ? "justify-center" : ""
              } grow`}
            >
              <div
                className="h-[45px] w-[45px] flex flex-col justify-center bg-[rgb(40,40,40)] rounded-md overflow-hidden"
                ref={listSongRef}
              >
                {item?.musicList?.imageURL ? (
                  <img src={item.musicList.imageURL} alt="track" />
                ) : (
                  <RiMusic2Line className="text-[30px] mx-auto" />
                )}
              </div>
              <div
                className={`listsong-info ms-3 grow flex flex-col overflow-hidden ${
                  resizeStyle === "1" ? "hidden" : ""
                }`}
                style={{
                  maxWidth: `${
                    resizeStyle === "3" ? `${200 - 15 * (level - 1)}px` : "100%"
                  }`,
                }}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis text-white">
                  {item.musicList.name}
                </span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.musicList.type} •{" "}
                  {item.musicList.type === "Album"
                    ? item.musicList.musiclist_attributes.singers
                        ?.map((singer) => singer.name)
                        .join(", ")
                    : item.musicList.musiclist_attributes?.user.role === "admin"
                    ? "Spotifree"
                    : item.musicList.musiclist_attributes?.user._id}
                </span>
              </div>
            </div>
          ) : viewAs === "Compact" &&
            (resizeStyle === "2" || resizeStyle === "3") ? (
            <div className={`order-3 grow`}>
              <div
                className={`listsong-info grow flex overflow-hidden ${
                  resizeStyle === "1" ? "hidden" : ""
                }`}
                style={{
                  maxWidth: `${resizeStyle === "3" ? "100%" : "100%"}`,
                }}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
                  {item.musicList.name}
                </span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px]">
                  • {item.musicList.type}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            className={`my-auto w-[150px] ${
              resizeStyle !== "3" ? "hidden" : "order-2"
            }`}
          >
            {dateDistance(item.dateAdded)}
          </div>
          <div
            className={`my-auto w-[150px] ${
              resizeStyle !== "3" ? "hidden" : "order-1"
            } text-right`}
          >
            {dateDistance(item.datePlayed)}
          </div>
        </div>
      </div>
    </Tooltip>
  );
}
