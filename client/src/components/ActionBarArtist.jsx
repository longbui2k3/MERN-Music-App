import React, { useEffect, useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { followSinger, getUser, unfollowSinger } from "../api";
import { useParams } from "react-router-dom";
import { setUserGlobal } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export default function ActionBarArtist() {
  const [isPlayClick, setIsPlayClick] = useState(false);
  const [isFollowClick, setIsFollowClick] = useState(false);
  const [isMoreHover, setIsMoreHover] = useState(false);
  const [isMoreClick, setIsMoreClick] = useState(false);
  const [followed, setFollowed] = useState(false);
  let params = useParams();
  useEffect(() => {
    const getUserFunc = async () => {
      try {
        const res = await getUser();
        if (
          res.data.metadata.user.singers.find(
            (singer) => singer.singer._id === params.id
          )
        ) {
          setFollowed(true);
        } else setFollowed(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserFunc();
  }, []);
  const dispatch = useDispatch();
  const followSingerFunc = async (e) => {
    try {
      await followSinger(params.id);
      setFollowed(true);
      const user = await getUser();
      dispatch(setUserGlobal(user.data.metadata.user));
    } catch (err) {
      console.log(err);
    }
  };
  const unfollowSingerFunc = async (e) => {
    try {
      await unfollowSinger(params.id);
      setFollowed(false);
      const user = await getUser();
      dispatch(setUserGlobal(user.data.metadata.user));
    } catch (err) {
      console.log(err);
    }
  };
  function handlePlayClick() {
    setIsPlayClick((preState) => !preState);
  }

  function handleFollowClick(e) {
    if (followed) {
      unfollowSingerFunc(e);
    } else followSingerFunc(e);
  }

  function handleMoreClick() {
    setIsMoreClick((preState) => !preState);
  }

  function handleMoreHover() {
    setIsMoreHover((preState) => !preState);
  }

  return (
    <div className="flex items-center justify-start gap-1 opacity-75 z-40 bg-[#121212] py-4 px-6">
      <div
        className="transition ease-in-out delay-15 hover:-translate-y-0.5 hover:scale-110 duration-300 cursor-pointer mr-6"
        onClick={handlePlayClick}
      >
        {isPlayClick ? (
          <AiFillPauseCircle color="#1ED760" size={65} />
        ) : (
          <AiFillPlayCircle color="#1ED760" size={65} />
        )}
      </div>
      <button
        className="box-border h-8 w-32 border border-gray-400 rounded-full mr-6 font-bold text-white hover:-translate-y-0.1 hover:scale-110 duration-300 hover:border-white"
        onClick={handleFollowClick}
      >
        {followed ? "Following" : "Follow"}
      </button>
      <div className="relative">
        <button
          aria-haspopup="menu"
          aria-label="Other option for artist"
          aria-expanded="false"
          onClick={handleMoreClick}
          onMouseLeave={handleMoreHover}
          onMouseOut={handleMoreHover}
        >
          <span aria-hidden="true">
            <IoIosMore size={28} />
          </span>
        </button>
        {isMoreClick && (
          <div className="h-[150px] w-[300px] z-[9999] bg-[#1f1d1d] shadow-sm absolute top-8 left-0 m-0">
            <button
              className="w-full flex items-center py-3 pl-3 pr-2 gap-2 hover:bg-neutral-700"
              onClick={handleFollowClick}
            >
              {isFollowClick ? (
                <>
                  <div>
                    <SlUserFollowing size={20} color="white" />
                  </div>
                  <div className="text-base text-white">Unfollow</div>
                </>
              ) : (
                <>
                  <div>
                    <SlUserFollow size={20} color="white" />
                  </div>
                  <div className="text-base text-white">Follow</div>
                </>
              )}
            </button>
            <button className="w-full flex items-center py-3 pl-3 pr-2 gap-2 hover:bg-neutral-700">
              <div>
                <MdOutlineReportGmailerrorred size={20} color="white" />
              </div>
              <div className="text-base text-white">Report</div>
            </button>
            <button className="w-full flex items-center py-3 pl-3 pr-2 gap-2 hover:bg-neutral-700">
              <div>
                <IoShareOutline size={20} color="white" />
              </div>
              <div className="text-base text-white">Share</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
