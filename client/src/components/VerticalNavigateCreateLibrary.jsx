import { FaRegFolder } from "react-icons/fa6";
import { TbMusicPlus } from "react-icons/tb";

export default function VerticalNavigateCreateLibrary({ leftPos }) {
  return (
    <nav
      className={`navigate-create absolute top-[48px] z-[1000] w-[220px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden`}
      style={{ left: `${leftPos}px` }}
    >
      <ul>
        <li
          className="flex px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
          onClick={""}
        >
          <TbMusicPlus className="my-auto text-[22px] me-3" />
          Create a new playlist
        </li>
        <li
          className="flex px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
          onClick={""}
        >
          <FaRegFolder className="my-auto text-[22px] me-3" />
          Create a playlist folder
        </li>
      </ul>
    </nav>
  );
}