import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Logout, getUser } from "../api";
import {
  IoGridOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useCookies } from "react-cookie";
import { IoIosList, IoMdOpen } from "react-icons/io";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { back, next } from "../features/navigate/navigateSlice";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { NavigateAuth } from "../context/NavigateContext";
import { setName, setView } from "../features/discography/discographySlice";
import { VerticalNavigateViewDisco } from "./VerticalNavigateViewDisco";
// import { ExternalLinkIcon } from "@chakra-ui/icons";

const VerticalNavigateAvatar = ({ navigateAvatar, user }) => {
  const [cookies, setCookie] = useCookies([""]);

  const { navigatePage } = NavigateAuth();
  function clickNavigateProfile() {
    navigatePage(`/user/${user._id}`);
  }
  function clickNavigateAccount() {
    navigatePage("#", { replace: true });
  }
  async function clickLogOut() {
    try {
      await Logout();
      setCookie("jwt", "", {});
      localStorage.setItem("user", "");
      navigatePage(0);
    } catch (err) {
      navigatePage(0);
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
  const navigate = useNavigate();
  const { navigatePage } = NavigateAuth();
  const [navigateAvatar, setNavigateAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  function avatarClick() {
    setNavigateAvatar(!navigateAvatar);
  }
  function notificationClick() {
    if (!window.location.href.includes("content-feed"))
      navigatePage("/content-feed");
    else dispatch(back());
  }
  function navigateLogInClick() {
    navigatePage("/logIn");
  }
  function navigateSignUpClick() {
    navigatePage("/signUp");
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
        setUser(res.data.metadata.user);
      } catch (err) {
        setIsLoading(false);
        setUser("");
      }
    };
    if (isLoading) getUserFunc();
  }, []);

  const [discography, setDiscography] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("discography")) {
      setDiscography(true);
    } else {
      setDiscography(false);
      dispatch(setName(""));
    }
  }, [window.location.href]);
  const nameDisco = useSelector((state) => state.discography.name);
  const viewDisco = useSelector((state) => state.discography.view);
  const filterDisco = useSelector((state) => state.discography.filter);
  const [openVNDisco, setOpenVNDisco] = useState(false);
  return (
    <header
      className={`sticky flex flex-col top-0 z-[1000] bg-[#121212] text-[#b3b3b3] w-[99%]`}
      style={{
        height: `70px`,
      }}
    >
      <div>
        <Box display="flex" style={{ lineHeight: "64px", padding: "0 20px " }}>
          <Tooltip label="Go back">
            <button
              disabled={!currentPage.prev}
              className="flex flex-col justify-center bg-black my-[17px] w-[32px] h-[32px] rounded-full disabled:opacity-60"
              onClick={goBackFunc}
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
              onClick={goForwardFunc}
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
              {window.location.href.includes("content-feed") ? (
                <Tooltip label="What's new">
                  <div
                    className="w-[100px] h-[100px] scale-[0.35] rounded-full -mt-4 me-1 absolute top-0 right-[50px] bg-black"
                    onClick={notificationClick}
                  >
                    <IoNotifications
                      className={"hover:text-white cursor-pointer mx-auto mt-3"}
                      fontSize={"65px"}
                    />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip label="What's new">
                  <div
                    className="w-[100px] h-[100px] scale-[0.35] rounded-full -mt-4 me-1 absolute top-0 right-[50px] bg-black"
                    onClick={notificationClick}
                  >
                    <IoNotificationsOutline
                      className={"hover:text-white cursor-pointer mx-auto mt-3"}
                      fontSize={"65px"}
                    />
                  </div>
                </Tooltip>
              )}
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
      </div>
      {discography ? (
        <div className="relative ps-[20px] pe-[30px] flex justify-between bg-[#121212]">
          <div className="text-white font-bold text-[25px]">{nameDisco}</div>
          <div className="flex">
            <div
              className="flex"
              onClick={function (e) {
                setOpenVNDisco(!openVNDisco);
              }}
            >
              <div className="my-auto">All</div>
              {openVNDisco ? (
                <VscTriangleUp className="ms-[10px] my-auto" />
              ) : (
                <VscTriangleDown className="ms-[10px] my-auto" />
              )}
            </div>
            {openVNDisco ? <VerticalNavigateViewDisco filter={filterDisco} /> : ""}
            <div
              className={`ms-[10px] p-[10px] flex justify-center rounded-full bg-[${
                viewDisco === "List" ? "rgb(50,50,50)" : "none"
              }] ${
                viewDisco === "List" ? "text-white" : ""
              } hover:bg-[rgb(50,50,50)] hover:text-white`}
              onClick={function (e) {
                dispatch(setView("List"));
              }}
            >
              <IoIosList size={20} className="bg-[none] my-auto " />
            </div>
            <div
              className={`ms-[10px] p-[10px] flex justify-center rounded-full bg-[${
                viewDisco === "Grid" ? "rgb(50,50,50)" : "none"
              }] ${
                viewDisco === "Grid" ? "text-white" : ""
              } hover:bg-[rgb(50,50,50)] hover:text-white`}
              onClick={function (e) {
                dispatch(setView("Grid"));
              }}
            >
              <IoGridOutline size={19} className="my-auto" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
