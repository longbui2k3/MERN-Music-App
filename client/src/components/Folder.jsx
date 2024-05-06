import { Tooltip } from "@chakra-ui/react";
import { FaRegFolder } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleLeft } from "react-icons/go";
import { dateDistance } from "../config";
import { useEffect, useRef, useState } from "react";
import { getChildOfFolder } from "../api";

export default function Folder({
  item,
  resizeStyle,
  viewAs,
  listSongRef,
  level,
  setSelectedFolder,
  selectedChilds,
  setSelectedChilds,
}) {
  const [isOpenSubFolder, setIsOpenSubFolder] = useState(false);
  const [childs, setChilds] = useState(false);
  const getChildOfFolderFunc = async () => {
    try {
      const res = await getChildOfFolder(item._id);
      setChilds(res.data.metadata.childs);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getChildOfFolderFunc();
  }, [childs]);

  useEffect(() => {
    if (
      selectedChilds &&
      selectedChilds[0] &&
      selectedChilds[0].parentId === item._id
    ) {
      setChilds(selectedChilds);
      setSelectedChilds([]);
      setSelectedFolder(null);
    }
  }, [selectedChilds]);
  const textRef = useRef();
  useEffect(() => {
    const spanNames = document.querySelectorAll(".span-name");
    spanNames.forEach((spanName) => {
      const width = textRef.current.offsetWidth - 70;
      spanName.style.width = `${width}px`;
    });
  }, [textRef.current?.offsetWidth]);
  return (
    <>
      <Tooltip
        label={
          <>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
              {item?.name}
            </div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px] text-[#b3b3b3]">
              0 playlists
            </div>
          </>
        }
        placement="right"
        bg="rgb(40,40,40)"
        isDisabled={resizeStyle === "1" ? false : true}
      >
        <div
          className={`gap-2 p-2 z-[10] relative cursor-pointer text-[#b3b3b3] font-semibold text-[14px] hover:bg-[rgb(35,35,35)] rounded-lg`}
          style={{
            marginLeft: `${15 * (level - 1)}px`,
          }}
          onContextMenu={function (e) {
            setSelectedFolder(item._id);
          }}
        >
          <div
            className={`flex ${
              resizeStyle === "3" ? "flex-row-reverse" : ""
            } w-full`}
          >
            {viewAs === "List" || resizeStyle === "1" ? (
              <div
                className={`relative order-3 flex justify-between items-center ${
                  resizeStyle === "1" ? "justify-center" : ""
                } grow`}
              >
                <div className="flex grow" ref={textRef}>
                  <div
                    className="h-[45px] w-[45px] flex flex-col justify-center bg-[rgb(40,40,40)] overflow-hidden rounded-lg"
                    ref={listSongRef}
                  >
                    <FaRegFolder className="text-[27px] mx-auto" />
                  </div>

                  <div
                    className={`listsong-info ms-3 grow flex flex-col overflow-hidden ${
                      resizeStyle === "1" ? "hidden" : ""
                    }`}
                    style={{
                      maxWidth: `${resizeStyle === "3" ? `100%` : "100%"}`,
                      // minWidth: `0px`,
                    }}
                  >
                    <span className="span-name truncate text-white">
                      {item?.name}
                    </span>
                    <span className="truncate" style={{ minWidth: "0px" }}>
                      {childs.length} folder
                    </span>
                  </div>
                </div>
                <div>
                  {resizeStyle !== "1" ? (
                    isOpenSubFolder ? (
                      <div
                        className={`z-[1000] me-7`}
                        onClick={function (e) {
                          setIsOpenSubFolder(false);
                        }}
                        style={{
                          right: resizeStyle === "2" ? "10px" : "",
                          left:
                            resizeStyle !== "2"
                              ? `${240 - 15 * (level - 1)}px`
                              : "",
                        }}
                      >
                        <GoTriangleDown className={`text-[25px]`} />
                      </div>
                    ) : (
                      <div
                        className={`z-[1000] me-7`}
                        onClick={function (e) {
                          setIsOpenSubFolder(true);
                        }}
                        style={{
                          right: resizeStyle === "2" ? "10px" : "",
                          left:
                            resizeStyle !== "2"
                              ? `${240 - 15 * (level - 1)}px`
                              : "",
                        }}
                      >
                        <GoTriangleLeft className={`text-[25px]`} />
                      </div>
                    )
                  ) : (
                    ""
                  )}
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
                  className={`listsong-info grow flex overflow-hidden ${
                    resizeStyle === "1" ? "hidden" : ""
                  }`}
                  style={{
                    maxWidth: `${resizeStyle === "3" ? "200px" : "100%"}`,
                  }}
                >
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
                    {item.name}
                  </span>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px]">
                    • 0 playlists
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
              className={`my-auto w-[150px] text-right ${
                resizeStyle !== "3" ? "hidden" : "order-1"
              } `}
            >
              {dateDistance(item.datePlayed)}
            </div>
          </div>
        </div>
      </Tooltip>
      {isOpenSubFolder && resizeStyle !== "1"
        ? childs.map((child) => {
            return (
              <Folder
                item={child}
                resizeStyle={resizeStyle}
                viewAs={viewAs}
                listSongRef={listSongRef}
                level={level + 1}
                setSelectedFolder={setSelectedFolder}
                selectedChilds={selectedChilds}
                setSelectedChilds={setSelectedChilds}
              />
            );
          })
        : ""}
    </>
  );
}
