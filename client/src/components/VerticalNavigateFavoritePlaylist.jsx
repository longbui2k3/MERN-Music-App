import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
  addSongToPlaylist,
  createPlaylist,
  getMusicListsByUserId,
  getUser,
} from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserGlobal } from "../features/user/userSlice";
import { NavigateAuth } from "../context/NavigateContext";

export default function VerticalNavigateFavoritePlaylist({
  setIsOpenVNFavoritePlaylistNew,
  song,
}) {
  const [playlists, setPlaylists] = useState(null);
  const dispatch = useDispatch();
  const { navigatePage } = NavigateAuth();
  const userGlobal = useSelector((state) => state.user.user);
  useEffect(() => {
    setPlaylists(
      userGlobal.musicLists.filter(
        (musiclist) => musiclist.musicList.type === "Playlist"
      )
    );
  }, []);
  const createNewPlaylistFunc = async () => {
    try {
      const res = await createPlaylist({
        name: `${song.name}`,
        type: "Playlist",
        imageURL: `${song.imageURL}`,
        songs: [`${song._id}`],
      });
      const res2 = await getUser();
      dispatch(setUserGlobal(res2.data.metadata.user));
      navigatePage(`/playlist/${res.data.metadata.playlist._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const addSongToMusicListFunc = async (playlist) => {
    try {
      const res = await addSongToPlaylist({ song: song._id, playlist });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav
      className={`navigate-viewmode absolute z-[1000] w-[220px] bg-[rgb(40,40,40)] rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)]`}
      style={{
        left: `-220px`,
        top: `0px`,
      }}
    >
      <li
        className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
        onMouseEnter={() => {
          setIsOpenVNFavoritePlaylistNew(true);
        }}
        onClick={function (e) {
          createNewPlaylistFunc();
          setIsOpenVNFavoritePlaylistNew(false);
        }}
      >
        <GoPlus size={20} color="white" className="me-3 my-auto" />
        Create playlist
      </li>
      <div className="bg-[rgb(50,50,50)] mt-[1px] h-[1px]" />
      {playlists?.map((playlist) => (
        <li
          className="flex px-[10px] py-[10px] hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
          onMouseEnter={() => {
            setIsOpenVNFavoritePlaylistNew(true);
          }}
          onClick={function (e) {
            addSongToMusicListFunc(playlist.musicList._id);
            setIsOpenVNFavoritePlaylistNew(false);
          }}
        >
          {playlist.musicList.name}
        </li>
      ))}
    </nav>
  );
}
