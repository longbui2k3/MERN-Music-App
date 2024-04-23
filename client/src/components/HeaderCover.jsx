import React, { useEffect, useState } from "react";
import { getPlaylist } from "../api";
import { getAlbumById } from "../api";
import { useParams } from "react-router-dom";
import { RiMusic2Line } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { openEditFormPlaylist } from "../features/editForm/editFormSlice";
export default function HeaderCover({ type }) {
  const [musiclist, setMusiclist] = useState({});
  const [duration, setDuration] = useState("");
  const [isHoverAvatar, setIsHoverAvatar] = useState(false);
  const dispatch = useDispatch();
  let params = useParams();
  useEffect(() => {
    const getMusiclistFunc = async () => {
      try {
        let res;
        if (params.id)
          if (type === "Album") {
            res = await getAlbumById(params.id);
            setMusiclist(res.data.metadata.album);
            const totalSeconds = res.data.metadata.album.songs
              .map((song) => {
                const [minutes, seconds] = song.duration
                  .split(":")
                  .map((value) => value - 0);

                const totalSeconds = minutes * 60 + seconds;
                return totalSeconds;
              })
              .reduce((total, value) => {
                return total + value;
              }, 0);
            setDuration(
              `${Math.floor(totalSeconds / 60)} min ${totalSeconds % 60} sec`
            );
          } else if (type === "Playlist") {
            res = await getPlaylist(params.id);
            setMusiclist(res.data.metadata.playlist);
          }
      } catch (err) {
        console.log(err);
      }
    };
    getMusiclistFunc();
  }, [params.id]);
  useEffect(() => {
    if (musiclist.name) document.title = `${musiclist.name}`;
  }, [musiclist]);

  return (
    <>
      <div className="w-full mx-0 my-0.5 flex items-center gap-0.5 pl-[20px] pr-[20px] ">
        <div
          className="image relative"
          onMouseEnter={() => setIsHoverAvatar(true)}
          onMouseLeave={() => setIsHoverAvatar(false)}
        >
          {isHoverAvatar && type === "Playlist" ? (
            <div
              className="absolute backdrop-brightness-[0.6] shadow-xl w-[232px] h-[232px]"
              onClick={function (e) {
                dispatch(openEditFormPlaylist());
              }}
            >
              <div className="mx-[57px] my-[65px]">
                <FontAwesomeIcon
                  icon={faPen}
                  className="text-[48px] w-[100%] text-white"
                  style={{ margin: "auto auto" }}
                />
                <p className="text-white mt-[15px]">Choose a photo</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {musiclist.imageURL ? (
            <img
              className="shadow-2xl w-[232px] h-[232px] rounded-[4px] mr-[16px]"
              src={`${musiclist.imageURL}`}
              alt="Selected Musiclist"
            />
          ) : (
            <div className="flex flex-col justify-center w-[232px] h-[232px] bg-[rgb(40,40,40)] rounded-[4px] mr-[20px]">
              <RiMusic2Line className="text-[50px] mx-auto" />
            </div>
          )}
        </div>
        <div className="mt-10 flex flex-col gap-4 text-gray-300">
          <span className="type">
            {musiclist.type === "Album" && musiclist.songs.length === 1
              ? "Single"
              : musiclist.type}
          </span>
          <h1 className="text-white text-6xl font-bold">{musiclist.name}</h1>
          <div>{musiclist.description}</div>
          <div className="description flex font-semibold">
            {musiclist.musiclist_attributes?.user?.role === "admin" ? (
              <img
                className="w-[30px] h-[30px] me-2"
                src="https://firebasestorage.googleapis.com/v0/b/auth-music-app.appspot.com/o/Spotify_logo_without_text.svg?alt=media&token=b0b2a071-3611-41da-81c7-003effb2f288"
                alt=""
              ></img>
            ) : (
              ""
            )}
            <div className="flex flex-col justify-center">
              {musiclist.type === "Album"
                ? musiclist.musiclist_attributes?.singers
                    ?.map((singer) => singer.name)
                    .join(" • ") +
                  " • " +
                  `${musiclist.songs?.length} songs` +
                  " • " +
                  `${duration ? duration : ""}`
                : musiclist.musiclist_attributes?.user?.role === "admin"
                ? "Spotifree" +
                  " • " +
                  `${musiclist.songs?.length} songs` +
                  " • " +
                  `${duration ? duration : ""}`
                : musiclist.musiclist_attributes?.user?._id +
                  " • " +
                  `${musiclist.songs?.length} songs` +
                  " • " +
                  `${duration ? duration : ""}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
