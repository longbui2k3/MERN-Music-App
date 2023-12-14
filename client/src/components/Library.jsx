import { Box } from "@chakra-ui/react";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Library = () => {
  return (
    <div>
      {" "}
      <Box marginTop={2} padding="4px 12px">
        <FontAwesomeIcon icon={faLayerGroup} />
        <span className={"ml-[12px] text-[14px]"}>Library</span>
      </Box>
    </div>
  );
};

export default Library;
