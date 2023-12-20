import React from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import {
  faCircleChevronRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <header
      className={
        "h-[64px] sticky top-0 ease-in-out duration-300 bg-[#121212] z-20"
      }
    >
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

      <Tooltip label="View profile">
        <FontAwesomeIcon
          icon={faUser}
          style={{
            float: "right",
            lineHeight: "64px",
            padding: "23px 30px ",
          }}
          className={"hover:text-white cursor-pointer"}
        />
      </Tooltip>
    </header>
  );
}
