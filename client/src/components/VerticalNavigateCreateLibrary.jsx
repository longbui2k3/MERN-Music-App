import { TbMusicPlus } from "react-icons/tb";
import {
  createFolder,
  createPlaylist,
  getChildOfFolder,
  getItemsByUserId,
  getUser,
} from "../api";
import { NavigateAuth } from "../context/NavigateContext";
import { useEffect } from "react";

export default function VerticalNavigateCreateLibrary({
  leftPos,
  topPos,
  text1,
  icon2,
  text2,
  items,
  setItems,
  parentFolder,
  setSelectedChilds,
  setSelectedFolder,
}) {
  const { navigatePage } = NavigateAuth();
  const createNewPlaylistFunc = async () => {
    try {
      const user = await getUser();
      const myPlaylistLength = items.filter(
        (item) =>
          item?.musicList?.type === "Playlist" &&
          item?.musicList?.musiclist_attributes?.user._id ===
            user.data.metadata.user._id
      ).length;
      const res = await createPlaylist({
        name: `My Playlist #${myPlaylistLength + 1}`,
        type: "Playlist",
      });
      const res2 = await getItemsByUserId({});
      setItems(res2.data.metadata.items);

      navigatePage(`/playlist/${res.data.metadata.playlist._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const createFolderFunc = async () => {
    try {
      const res = await createFolder(parentFolder);
      const res2 = await getItemsByUserId({});
      console.log(res2);
      setItems(res2.data.metadata.items);

      await getChildOfFolderFunc();
    } catch (err) {
      console.log(err);
    }
  };
  const getChildOfFolderFunc = async () => {
    try {
      const res = await getChildOfFolder(parentFolder);
      setSelectedChilds(res.data.metadata.childs);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav
      className={`navigate-create absolute top-[189px] z-[10000] w-[200px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden`}
      style={{ left: `${leftPos}px`, top: `${topPos}px` }}
    >
      <ul>
        <li
          className="flex px-[14px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
          onMouseDown={createNewPlaylistFunc}
        >
          <TbMusicPlus className="my-auto text-[22px] me-3" />
          {text1}
        </li>
        <li
          className="flex px-[14px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
          onMouseDown={createFolderFunc}
        >
          {icon2}
          {text2}
        </li>
      </ul>
    </nav>
  );
}
