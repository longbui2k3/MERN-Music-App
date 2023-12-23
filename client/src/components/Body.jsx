import { Box, Image, Tooltip } from "@chakra-ui/react";
import {
  faCircleChevronRight,
  faCirclePlay,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import SingerAPI from "../api/SingerAPI";
import SongAPI from "../api/SongAPI";
import { Logout, getUser } from "../api";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "react-bootstrap";
const VerticalNavigateAvatar = ({ navigateAvatar }) => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies([""]);
  function clickNavigateAccount() {
    navigate("#", { replace: true });
  }
  function clickNavigateProfile() {
    navigate("#");
  }
  async function clickLogOut() {
    try {
      const res = await Logout();
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
        <nav className="absolute right-6 w-[200px] bg-[rgb(40,40,40)] z-50 rounded-md shadow-md text-[14px] font-medium text-[rgb(230,230,230)] overflow-hidden">
          <ul>
            <li
              className="px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer"
              onClick={clickNavigateAccount}
            >
              Account <ExternalLinkIcon className="float-right text-[20px]" />
            </li>
            <li
              className="px-4 py-3 hover:text-white hover:bg-[rgb(50,50,50)] cursor-pointer "
              onClick={clickNavigateProfile}
            >
              Profile
            </li>
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
const Body = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState("");
  const [songs, setSongs] = useState([]);
  const [navigateAvatar, setNavigateAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAllSongs = async () => {
      const songsData = await SongAPI.getAllSong();
      setSongs(songsData.data.data);
    };
    getAllSongs();
  }, []);
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
  function avatarClick() {
    setNavigateAvatar(!navigateAvatar);
  }
  function navigateLogInClick() {
    navigate("/logIn");
  }
  function navigateSignUpClick() {
    navigate("/signUp");
  }
  return (
    <>
      <header className={"h-[70px] relative"}>
        <Box
          display="inline-block"
          style={{ lineHeight: "64px", padding: "0 20px " }}
        >
          <Tooltip label="Go back">
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              rotation={180}
              size="xl"
              className={"hover:text-white cursor-pointer"}
            />
          </Tooltip>

          <Tooltip label="Go forward">
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              size="xl"
              style={{ marginLeft: "16px" }}
              className={"hover:text-white cursor-pointer"}
            />
          </Tooltip>
        </Box>
        {!isLoading ? (
          user ? (
            <>
              <Tooltip label={user.name}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    float: "right",
                    lineHeight: "64px",
                    padding: "23px 30px ",
                  }}
                  className={"hover:text-white cursor-pointer me-2"}
                  onClick={avatarClick}
                />
              </Tooltip>
              <VerticalNavigateAvatar navigateAvatar={navigateAvatar} />{" "}
            </>
          ) : (
            <div className="float-right me-[40px] my-[10px]">
              <Button
                className="w-[120px] py-[10px] rounded-full font-semibold hover:text-white hover:font-bold focus:outline-none"
                onClick={navigateSignUpClick}
              >
                Sign Up
              </Button>
              <Button
                className="w-[120px] py-[10px] rounded-full text-white font-semibold hover:font-bold hover:bg-[rgb(35,35,35)] focus:outline-none"
                onClick={navigateLogInClick}
              >
                Log In
              </Button>
            </div>
          )
        ) : (
          ""
        )}
      </header>
      {/* Body */}
      <div
        style={{
          lineHeight: "64px",
          padding: "0 20px",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        {/* Recently played section */}
        <div>
          <p className={"text-[22px] text-white"}>Recently played</p>

          {/* <div
              className={
                "grid gap-4 lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2"
              }
              > */}

          <div>
            {songs.map((song, index) => (
              <SongListItem key={index} song={song} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const SongListItem = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [artist, setArtist] = useState("");
  useEffect(() => {
    const getArtist = async () => {
      const artistData = await SingerAPI.getSingerById(song.artist);
      setArtist(artistData.data.singer);
    };
    getArtist();
  }, []);
  return (
    <div
      className={
        "h-[270px] rounded-md w-[190px] inline-block cursor-pointer mr-[24px] mb-[24px]"
      }
      style={{ backgroundColor: "#181818" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          height: "100%",
          padding: "16px",
          position: "relative",
        }}
        className={"hover:bg-neutral-800 rounded-md"}
      >
        <div
          style={{
            position: "relative",
            height: "160px",
            width: "160px",
            transform: "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <Image
            boxSize="160px"
            objectFit="cover"
            src={song.imageURL}
            alt={song.name}
            className={"rounded-md"}
            style={{
              position: "absolute",
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
          />
          <FontAwesomeIcon
            icon={faCirclePlay}
            style={{
              color: "#3ae723",
              zIndex: "2",
              position: "absolute",
              bottom: "8px",
              right: "8px",
              boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              transform: `translateY(${isHovered ? "0" : "100%"})`,
              transition: "transform 0.3s ease, opacity 0.3s ease",
              opacity: isHovered ? 1 : 0,
            }}
            className={"text-[48px] hover:text-[50px] "}
          />
        </div>

        <div style={{ height: "70px", maxWidth: "158px" }}>
          <div
            style={{
              position: "relative",
              height: "100%",
            }}
          >
            <span
              className={"text-[15px] font-bold text-white "}
              style={{
                maxWidth: "158px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
              }}
            >
              {song.name}
            </span>
            <br />
            <span
              className={"text-[14px] font-medium hover:underline"}
              style={{
                maxWidth: "158px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
                margin: "-36px 0",
              }}
            >
              {artist.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Body;
