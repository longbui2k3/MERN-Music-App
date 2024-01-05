import { IoIosList } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoGridOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { useEffect } from "react";
// 140
export default function VerticalNavigateViewModeLibrary({
  leftPos,
  sortBy,
  viewAs,
  setSortBy,
  setViewAs,
  isHidden,
}) {
  useEffect(() => {
    console.log(sortBy === "Recents" ? "rgb(29,185,84)" : "white");
  }, [sortBy]);
  const clickSortByRecents = (e) => {
    setSortBy("Recents");
  };
  function clickSortByRecentlyAdded(e) {
    setSortBy("Recently Added");
  }
  function clickSortByAlphabetical(e) {
    setSortBy("Alphabetical");
  }
  function clickSortByCreator(e) {
    setSortBy("Creator");
  }

  function clickViewAsCompact(e) {
    setViewAs("Compact");
  }
  function clickViewAsList(e) {
    setViewAs("List");
  }
  function clickViewAsGrid(e) {
    setViewAs("Grid");
  }

  return (
    <nav
      className={`navigate-viewmode absolute top-[280px] z-[1000] w-[180px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)]`}
      style={{
        left: `${leftPos}px`,
        zIndex: "100",
        display: `${isHidden ? "none" : "inline"}`,
      }}
    >
      <div className="px-4 py-3 text-[11px] font-bold text-[#b3b3b3]">
        Sort by
      </div>
      <ul>
        <li
          className={`flex justify-between px-[15px] py-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer`}
          onMouseDown={clickSortByRecents}
          style={{
            color: `${sortBy === "Recents" ? "rgb(29,185,84)" : "white"}`,
          }}
        >
          Recents
          {sortBy === "Recents" ? (
            <IoCheckmark size={20} color="rgb(29,185,84)" />
          ) : (
            ""
          )}
        </li>
        <li
          className={`flex justify-between px-[15px] py-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer`}
          onMouseDown={clickSortByRecentlyAdded}
          style={{
            color: `${
              sortBy === "Recently Added" ? "rgb(29,185,84)" : "white"
            }`,
          }}
        >
          Recently Added
          {sortBy === "Recently Added" ? (
            <IoCheckmark size={20} color="rgb(29,185,84)" />
          ) : (
            ""
          )}
        </li>
        <li
          className={`flex justify-between px-[15px] py-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer`}
          onMouseDown={clickSortByAlphabetical}
          style={{
            color: `${sortBy === "Alphabetical" ? "rgb(29,185,84)" : "white"}`,
          }}
        >
          Alphabetical
          {sortBy === "Alphabetical" ? (
            <IoCheckmark size={20} color="rgb(29,185,84)" />
          ) : (
            ""
          )}
        </li>
        <li
          className={`flex justify-between px-[15px] py-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer`}
          onMouseDown={clickSortByCreator}
          style={{
            color: `${sortBy === "Creator" ? "rgb(29,185,84)" : "white"}`,
          }}
        >
          Creator
          {sortBy === "Creator" ? (
            <IoCheckmark size={20} color="rgb(29,185,84)" />
          ) : (
            ""
          )}
        </li>
      </ul>
      <div className="bg-[rgb(50,50,50)] mt-[1px] h-[1px]" />
      <div className="px-[15px] py-[10px] text-[11px] font-bold text-[#b3b3b3]">
        View as
      </div>
      <ul>
        <li
          className="flex px-[15px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
          onMouseDown={clickViewAsCompact}
        >
          <HiOutlineBars3 size={20} color="white" className="me-3" />
          Compact
        </li>
        <li
          className="flex px-[15px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
          onMouseDown={clickViewAsList}
        >
          <IoIosList size={20} color="white" className="me-3" />
          List
        </li>
        <li
          className="flex px-[15px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
          onMouseDown={clickViewAsGrid}
        >
          <IoGridOutline size={19} color="white" className="me-3" />
          Grid
        </li>
      </ul>
    </nav>
  );
}
