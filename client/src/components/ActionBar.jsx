import React, { useEffect, useState } from "react";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { addFavoriteMusicList, getUser, removeFavoriteMusicList } from "../api";
import { TbRulerOff } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setUserGlobal } from "../features/user/userSlice";

export default function ActionBar() {
  const [isHeartHover, setIsHeartHover] = useState(false);
  const [isMoreHover, setIsMoreHover] = useState(false);

  function handleHeartHover() {
    setIsHeartHover(true);
  }

  function handleHeartHoverOut() {
    setIsHeartHover(false);
  }

  function handleMoreHover() {
    setIsMoreHover(true);
  }

  function handleMoreHoverOut() {
    setIsMoreHover(false);
  }

  let params = useParams();
  const [user, setUser] = useState("");
  const [liked, setLiked] = useState("");

  useEffect(() => {
    const getUserFunc = async () => {
      try {
        const res = await getUser();
        if (
          res.data.metadata.user.musicLists.find(
            (musicList) => musicList.musicList._id === params.id
          )
        ) {
          setLiked(true);
        } else setLiked(false);
      } catch (err) {
        setUser("");
      }
    };
    getUserFunc();
  }, []);
  const dispatch = useDispatch();
  const addFavoriteFunc = async (e) => {
    try {
      await addFavoriteMusicList(params.id);
      setLiked(true);
      const user = await getUser();
      dispatch(setUserGlobal(user.data.metadata.user));
    } catch (err) {
      console.log(err);
    }
  };
  const removeFavoriteFunc = async (e) => {
    try {
      await removeFavoriteMusicList(params.id);
      setLiked(false);
      const user = await getUser();
      dispatch(setUserGlobal(user.data.metadata.user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center place-content-between opacity-75 z-40 bg-[#121212] pt-4">
      <div className="flex items-center justify-center gap-x-1 ml-6">
        <span className="transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer">
          <AiFillPlayCircle color="#1ED760" size={65} />
        </span>
        <span
          className="px-5 cursor-pointer"
          onMouseOver={handleHeartHover}
          onMouseOut={handleHeartHoverOut}
        >
          {liked === true ? (
            <AiFillHeart
              size={40}
              color={"rgb(30,215,96)"}
              onClick={removeFavoriteFunc}
            />
          ) : (
            <AiOutlineHeart
              size={40}
              color={isHeartHover ? "white" : "grey"}
              onClick={addFavoriteFunc}
            />
          )}
        </span>
        <span
          className="cursor-pointer"
          onMouseOver={handleMoreHover}
          onMouseOut={handleMoreHoverOut}
        >
          <IoIosMore size={30} color={isMoreHover ? "white" : "grey"} />
        </span>
      </div>
      <div className="flex items-center justify-center gap-x-5 mr-10">
        <span>Option List</span>
        <span>
          <CgDetailsMore color="gray" size={30} />
        </span>
      </div>
    </div>
  );
}
