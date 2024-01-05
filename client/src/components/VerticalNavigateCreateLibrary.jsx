import { TbMusicPlus } from "react-icons/tb";

export default function VerticalNavigateCreateLibrary({
  leftPos,
  topPos,
  text1,
  icon2,
  text2,
}) {
  return (
    <nav
      className={`navigate-create absolute top-[184px] z-[1000] w-[200px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden`}
      style={{ left: `${leftPos}px`, top: `${topPos}px` }}
    >
      <ul>
        <li
          className="flex px-[14px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
          onClick={""}
        >
          <TbMusicPlus className="my-auto text-[22px] me-3" />
          {text1}
        </li>
        <li
          className="flex px-[14px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
          onClick={""}
        >
          {icon2}
          {text2}
        </li>
      </ul>
    </nav>
  );
}
