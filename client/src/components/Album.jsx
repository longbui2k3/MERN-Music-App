import React, { useEffect, useState } from "react";
import HeaderCover from "./HeaderCover";
import ActionBar from "./ActionBar";
import { AiFillClockCircle } from "react-icons/ai";
import { getAlbumById, getAllAlbums } from "../api";
import { useParams } from "react-router-dom";
import SongItem from "./SongItem";
import SongListItem from "./SongListItem";
import { useSelector } from "react-redux";
import { NavigateAuth } from "../context/NavigateContext";

export default function Album() {
  let params = useParams();
  const { navigatePage } = NavigateAuth();
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [moreAlbums, setMoreAlbums] = useState([]);

  const [columnCount, setColumnCount] = useState(6);
  const sidebarSize = useSelector((state) => state.resize.sidebarSize);
  const appContainerSize = useSelector(
    (state) => state.resize.appContainerSize
  );
  useEffect(() => {
    setColumnCount(Math.floor((appContainerSize - sidebarSize) / 230));
  }, [sidebarSize]);
  useEffect(() => {
    const getAlbumFunc = async () => {
      try {
        const res = await getAlbumById(params.id);
        setAlbum(res.data.metadata.album);
        setSongs(res.data.metadata.album.songs);
      } catch (err) {
        console.log(err);
      }
    };
    getAlbumFunc();
  }, [params.id]);
  useEffect(() => {
    const getAllAlbumsFunc = async () => {
      if (album.musiclist_attributes) {
        const res2 = await getAllAlbums({
          singer: album?.musiclist_attributes?.singers[0]._id,
        });
        console.log(res2);
        setMoreAlbums(res2.data.metadata.albums);
      }
    };
    getAllAlbumsFunc();
  }, [album]);

  const [currentMoreOptions, setCurrentMoreOptions] = useState(null);
  return (
    <>
      <HeaderCover
        type="Album"
        name={album.type}
        description={album.description}
      />
      <div className="relative opacity-95 z-40 bg-[#121212]">
        <ActionBar album={album} />
        <div className="mx-8 mb-3 grid grid-cols-[0.1fr_3.2fr_0.4fr] text-gray-400 top-0 bg-[#121212] py-4 px-2.5 transition duration-300 ease-in-out border-b border-current">
          <div>
            <span className="px-[6px]">#</span>
          </div>
          <div>
            <span className="px-[5px]">Title</span>
          </div>
          <div className="flex justify-center items-center">
            <span>
              <AiFillClockCircle />
            </span>
          </div>
        </div>

        {/* Song list */}
        <div className="relative mx-[2rem] flex flex-col pb-10">
          {songs.map((song, index) => (
            <SongItem
              key={song._id}
              song={song}
              index={index}
              likedSongs={likedSongs}
              setLikedSongs={setLikedSongs}
              setCurrentMoreOptions={setCurrentMoreOptions}
              currentMoreOptions={currentMoreOptions}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          lineHeight: "64px",
          padding: "0 0px",
          maxHeight: "80%",
          overflow: "none",
        }}
      >
        <div className="mx-8 mb-3 text-[#FFFFFF] font-bold text-[24px] flex justify-between items-center">
          <h2 className="cursor-pointer hover:underline">
            More of {album?.musiclist_attributes?.singers[0]?.name}
          </h2>
          <div
            className="text-[#B3B3B3] text-[14px] cursor-pointer hover:underline"
            onClick={function (e) {
              navigatePage(
                `/artist/${album?.musiclist_attributes?.singers[0]._id}/discography`
              );
            }}
          >
            See discography
          </div>
        </div>
        <div
          // className="mx-8 mb-3 flex gap-4 flex-wrap overflow-hidden"
          className="mx-8 mb-3 grid-songs grid gap-4 overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${columnCount},minmax(0,1fr))`,
            // gridAutoFlow: "row dense",
          }}
        >
          {moreAlbums?.map((item, index) =>
            item && item._id !== album._id ? (
              <SongListItem key={index} musicList={item} />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </>
  );
}
