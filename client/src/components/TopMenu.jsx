import { Box } from "@chakra-ui/react";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { useLocation, useNavigate } from "react-router-dom";
import { next } from "../features/navigate/navigateSlice";

const TopMenu = () => {
  const { width, height, ref } = useResizeDetector();
  const [resizeStyle, setResizeStyle] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (width < 223) {
      setResizeStyle(true);
    } else {
      setResizeStyle(false);
    }
  }, [width]);
  const dispatch = useDispatch();
  function navigateHomeFunc() {
    dispatch(next("/home"));
    navigate("/home");
  }
  return (
    <div ref={ref}>
      <Box
        marginTop={2}
        padding="4px 12px 4px 20px"
        className={"hover:text-white cursor-pointer"}
        onClick={navigateHomeFunc}
      >
        <FontAwesomeIcon icon={faHouse} fontSize={"23"} />{" "}
        <span
          className={`ml-[12px] text-[16px] font-bold ${
            resizeStyle ? "hidden" : ""
          }`}
        >
          Home
        </span>
      </Box>
      <Box
        marginTop={4}
        marginBottom={1}
        padding="4px 12px 4px 20px"
        className={"hover:text-white cursor-pointer"}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"23"} />{" "}
        <span
          className={`ml-[12px] text-[16px] font-bold ${
            resizeStyle ? "hidden" : ""
          }`}
        >
          Search
        </span>
      </Box>
    </div>
  );
};

export default TopMenu;
