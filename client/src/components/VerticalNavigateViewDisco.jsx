import { IoCheckmark } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setFilter } from "../features/discography/discographySlice";

export const VerticalNavigateViewDisco = ({ filter }) => {
  const dispatch = useDispatch();
  return (
    <nav
      className={`navigate-viewmode absolute z-[1000] w-[180px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden`}
      style={{
        right: `5px`,
        top: `50px`,
      }}
    >
      <li
        className="flex justify-between px-[15px] py-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer"
        style={{
          color: `${filter === "All" ? "rgb(29,185,84)" : "white"}`,
        }}
        onClick={function (e) {
          dispatch(setFilter("All"));
        }}
      >
        All
        {filter === "All" ? (
          <IoCheckmark size={20} color="rgb(29,185,84)" />
        ) : (
          ""
        )}
      </li>
      <li
        className="flex justify-between px-[15px] py-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer"
        style={{
          color: `${filter === "Albums" ? "rgb(29,185,84)" : "white"}`,
        }}
        onClick={function (e) {
          dispatch(setFilter("Albums"));
        }}
      >
        Albums
        {filter === "Albums" ? (
          <IoCheckmark size={20} color="rgb(29,185,84)" />
        ) : (
          ""
        )}
      </li>
      <li
        className="flex justify-between px-[15px] py-[10px] hover:bg-[rgb(50,50,50)] cursor-pointer"
        style={{
          color: `${filter === "Singles" ? "rgb(29,185,84)" : "white"}`,
        }}
        onClick={function (e) {
          dispatch(setFilter("Singles"));
        }}
      >
        Singles and EPs
        {filter === "Singles" ? (
          <IoCheckmark size={20} color="rgb(29,185,84)" />
        ) : (
          ""
        )}
      </li>
    </nav>
  );
};
