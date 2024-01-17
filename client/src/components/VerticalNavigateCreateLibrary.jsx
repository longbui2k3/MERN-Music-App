import { TbMusicPlus } from "react-icons/tb";
import { createPlaylist, getUser } from "../api";
import { useNavigate } from "react-router-dom";
import { getAllPlayListsByUserId } from "../api/PlaylistAPI";

export default function VerticalNavigateCreateLibrary({
  leftPos,
  topPos,
  text1,
  icon2,
  text2,
  listSongs,
  setListSongs,
}) {
  const navigate = useNavigate();
  const createNewPlaylistFunc = async () => {
    try {
      const user = await getUser();
      const myPlaylistLength = listSongs.filter(
        (listSong) =>
          listSong.type === "Playlist" &&
          listSong.user._id === user.data.data._id
      ).length;
      const res = await createPlaylist(user.data.data._id, {
        name: `My Playlist #${myPlaylistLength + 1}`,
        type: "Playlist",
      });
      const res2 = await getAllPlayListsByUserId(user.data.data._id);
      setListSongs(res2.data.playlists);
      navigate(`/playlist/${res.data.playlist._id}`)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav
      className={`navigate-create absolute top-[189px] z-[1000] w-[200px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden`}
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
          onClick={""}
        >
          {icon2}
          {text2}
        </li>
      </ul>
    </nav>
  );
}
