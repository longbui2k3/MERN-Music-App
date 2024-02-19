import React, { useEffect, useState } from "react";
import HeaderCover from "./HeaderCover";
import ActionBar from "./ActionBar";
import SongAPI from "../api/SongAPI";
import { AiFillClockCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getAlbumById } from "../api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { IoIosMore } from "react-icons/io";
import SongItem from "./SongItem";

export default function Album() {
  let params = useParams();
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [likedSong, setLikedSong] = useState(null);
  const [isHoveredHeartIcon, setIsHoveredHeartIcon] = useState(null);

  useEffect(() => {
    const getAlbumFunc = async () => {
      try {
        const res = await getAlbumById(params.id);
        console.log(res);
        setAlbum(res.data.metadata.album);
        setSongs(res.data.metadata.album.songs);
      } catch (err) {
        console.log(err);
      }
    };
    getAlbumFunc();
  }, [params.id]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const handleClickOnRow = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <>
      <HeaderCover
        type="Album"
        name={album.type}
        description={album.description}
      />
      <div className="opacity-95 z-40 bg-[#121212]">
        <ActionBar />
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
        <div className="mx-[2rem] flex flex-col pb-10">
          {songs.map((song, index) => (
            <SongItem key={song._id} song={song} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
