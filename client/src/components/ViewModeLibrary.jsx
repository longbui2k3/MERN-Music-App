import { HiOutlineBars3 } from "react-icons/hi2";
import { IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";

export default function ViewModeLibrary({
  openVerticalNavigateViewMode,
  viewModeBtnRef,
  sortBy,
  viewAs,
}) {
  return (
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
        document.querySelector(".viewas").style.transform = "scale(1.05)";
      }}
      onMouseLeave={function () {
        document.querySelector(".viewas svg").style.fill = "#b3b3b3";
        document.querySelector(".viewas").style.color = "#b3b3b3";
        document.querySelector(".viewas").style.transform = "scale(1.0)";
      }}
    >
      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {sortBy}
      </div>
      <div className="w-[23px]">
        {viewAs === "List" ? (
          <IoIosList size={20} className="ms-[6px] mt-[1px] fill-[#b3b3b3]" />
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
  );
}
