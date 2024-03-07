import { useEffect } from "react";
import { GoPlusCircle } from "react-icons/go";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiListPlus } from "react-icons/pi";

export default function VerticalNavigateMoreOptionsMusicList({
  addFavoriteFunc,
  removeFavoriteFunc,
  isLibrary,
}) {
  function clickAddToLibrary(e) {
    addFavoriteFunc(e);
  }
  function clickRemoveFromLibrary(e) {
    removeFavoriteFunc(e);
  }
  return (
    <nav
      className={`navigate-viewmode absolute z-[1000] w-[260px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-white`}
      style={{
        left: `180px`,
        top: `60px`,
      }}
    >
      <ul>
        {!isLibrary ? (
          <li
            className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
            onMouseDown={clickAddToLibrary}
          >
            <GoPlusCircle size={20} color="white" className="me-3 my-auto" />
            Save to your Liked Songs
          </li>
        ) : (
          <li
            className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
            onMouseDown={clickRemoveFromLibrary}
          >
            <IoIosCheckmarkCircle
              size={20}
              color="#1ED760"
              className="me-3 my-auto"
            />
            Remove from your Liked Songs
          </li>
        )}
        <li className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer">
          <PiListPlus size={20} color="white" className="me-3 my-auto" />
          Add to queue
        </li>
      </ul>
    </nav>
  );
}
