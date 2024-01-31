import { Box } from "@chakra-ui/react";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { NavigateAuth } from "../context/NavigateContext";

const TopMenu = () => {
  const { width, height, ref } = useResizeDetector();
  const [resizeStyle, setResizeStyle] = useState(false);
  useEffect(() => {
    if (width < 223) {
      setResizeStyle(true);
    } else {
      setResizeStyle(false);
    }
  }, [width]);
  const { navigatePage } = NavigateAuth();
  function navigateHomeFunc() {
    navigatePage("/home");
  }

  function navigateSearchFunc() {
    navigatePage("/search");
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
        onClick={navigateSearchFunc}
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
