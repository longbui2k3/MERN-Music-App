import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiMusic2Line } from "react-icons/ri";
import { getChildOfFolder } from "../api";
import { FaRegFolder } from "react-icons/fa6";

export default function GridFolder({ item, listSongRef }) {
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
  return (
    <Tooltip
      label={
        <>
          <div className="name whitespace-nowrap overflow-hidden text-ellipsis me-1 my-auto text-[16px] text-white">
            {item.name}
          </div>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis mt-[2px] text-[#b3b3b3]">
            {childs.length} folder
          </div>
        </>
      }
      placement="right"
      bg="rgb(40,40,40)"
    >
      <div
        className="rounded-md overflow-hidden grow bg-[rgb(40,40,40)] flex flex-col justify-center"
        ref={listSongRef}
        style={{
          minWidth: "60px",
          minHeight: "60px",
          aspectRatio: "1/1",
          //   maxWidth: "100px",
          //   maxHeight: "100px",
        }}
      >
        <div className="name hidden">{item?.name}</div>
        <FaRegFolder className="text-[40px] mx-auto" />
      </div>
    </Tooltip>
  );
}
