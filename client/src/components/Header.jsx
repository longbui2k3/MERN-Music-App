import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Tooltip } from "@chakra-ui/react";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Logout, getUser } from "../api";
import { IoPersonOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { IoMdOpen } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { back, next } from "../features/navigate/navigateSlice";
import { current } from "@reduxjs/toolkit";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
// import { ExternalLinkIcon } from "@chakra-ui/icons";

const VerticalNavigateAvatar = ({ navigateAvatar, user }) => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies([""]);
  function clickNavigateAccount() {
    navigate("#", { replace: true });
  }
  const dispatch = useDispatch();
  function clickNavigateProfile() {
    navigate(`/user/${user._id}`);
    dispatch(next(`/user/${user._id}`));
  }
  async function clickLogOut() {
    try {
      await Logout();
      setCookie("jwt", "", {});
      localStorage.setItem("user", "");
      navigate(0);
    } catch (err) {
      navigate(0);
    }
  }
  return (
    <>
      {navigateAvatar ? (
        <nav className="absolute right-7 w-[200px] bg-[rgb(40,40,40)] z-50 rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden">
          <ul>
            <li
              className="flex justify-between px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
              onClick={clickNavigateAccount}
            >
              {/* Account  */}
              Account <IoMdOpen className="my-auto" fontSize={"20"} />
            </li>
            <li
              className="px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
              onClick={clickNavigateProfile}
            >
              Profile
            </li>
            <div className="bg-[rgb(50,50,50)] mt-[1px] h-[1px]" />
            <li
              className="px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
              onClick={clickLogOut}
            >
              Log out
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default function Header() {
  let navigate = useNavigate();
  const [navigateAvatar, setNavigateAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  function avatarClick() {
    setNavigateAvatar(!navigateAvatar);
  }
  function navigateLogInClick() {
    navigate("/logIn");
  }
  function navigateSignUpClick() {
    navigate("/signUp");
  }

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.navigate.currentPage);

  function goBackFunc() {
    dispatch(back());
  }
  function goForwardFunc() {
    dispatch(next());
  }
  useEffect(() => {
    navigate(currentPage.data);
  }, [currentPage]);
  useEffect(() => {
    const getUserFunc = async () => {
      try {
        setIsLoading(true);
        const res = await getUser();
        setIsLoading(false);
        setUser(res.data.data);
      } catch (err) {
        setIsLoading(false);
        setUser("");
      }
    };
    if (isLoading) getUserFunc();
  }, []);
  return (
    <header className={"h-[70px] relative bg-[#121212] text-[#b3b3b3]"}>
      <Box display="flex" style={{ lineHeight: "64px", padding: "0 20px " }}>
        <Tooltip label="Go back">
          <button
            disabled={!currentPage.prev}
            className="flex flex-col justify-center bg-black my-[17px] w-[32px] h-[32px] rounded-full disabled:opacity-60"
            onMouseDown={goBackFunc}
          >
            <GoChevronLeft
              size="25px"
              className={"mx-auto hover:text-white cursor-pointer"}
              color="white"
            />
          </button>
        </Tooltip>
        <Tooltip label="Go forward">
          <button
            disabled={!currentPage.next}
            className="flex flex-col justify-center bg-black my-[17px] w-[32px] h-[32px] rounded-full disabled:opacity-60"
            style={{ marginLeft: "10px" }}
            onMouseDown={goForwardFunc}
          >
            <GoChevronRight
              size="25px"
              className={"mx-auto hover:text-white cursor-pointer"}
              color="white"
            />
          </button>
        </Tooltip>
        {/* <div
          style={{
            lineHeight: "64px",
            padding: "0 20px",
            height: "100%",
            maxHeight: "80%",
            width: "100%",
            overflow: "auto",
            opacity: 0.95,
            zIndex: 40,
            backgroundColor: "#121212",
          }}
        >
          {/* Recently played section */}
        {/* <div>
            <p className={"text-[22px] text-white"}>Recently played</p>
          </div>
        </div>  */}
      </Box>
      {!isLoading ? (
        user ? (
          <>
            <Tooltip label={user.name}>
              {user.avatar ? (
                <div
                  className={
                    "w-[100px] h-[100px] scale-[0.35] rounded-full -mt-4 me-1 absolute top-0 right-0"
                  }
                  style={{
                    backgroundImage: "url('" + user.avatar + "')",
                  }}
                  onClick={avatarClick}
                ></div>
              ) : (
                <div
                  className="w-[100px] h-[100px] scale-[0.35] rounded-full -mt-4 me-1 absolute top-0 right-0 bg-black"
                  onClick={avatarClick}
                >
                  <IoPersonOutline
                    className={"hover:text-white cursor-pointer mx-auto mt-3"}
                    fontSize={"65px"}
                  />
                </div>
              )}
            </Tooltip>
            <VerticalNavigateAvatar
              navigateAvatar={navigateAvatar}
              user={user}
            />{" "}
          </>
        ) : (
          <div className="float-right me-[40px] -mt-[56px]">
            <Button
              className="w-[120px] py-[20px] rounded-full font-semibold hover:text-white hover:font-bold focus:outline-none"
              style={{
                background: "none",
                color: "rgb(240, 240, 240)",
              }}
              onClick={navigateSignUpClick}
            >
              Sign Up
            </Button>
            <Button
              className="w-[120px] py-[20px] text-white font-semibold hover:font-bold hover:bg-[rgb(35,35,35)] hover:scale-[1.05] focus:outline-none"
              onClick={navigateLogInClick}
              style={{
                borderRadius: "30px",
              }}
            >
              Log In
            </Button>
          </div>
        )
      ) : (
        ""
      )}
    </header>
  );
}
