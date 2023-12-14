import { Grid, GridItem } from "@chakra-ui/react";
import {
  faBackwardStep,
  faCirclePlay,
  faForwardStep,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Library from "./Library";
import TopMenu from "./TopMenu";
import Body from "./Body";
import MusicPlayer from "./MusicPlayer";

const PageHome = () => {
  return (
    <div className={"bg-black h-[860px] p-[8px]"}>
      <Grid
        templateAreas={`
                  "nav main"
                  "history main"`}
        gridTemplateRows={"112px 660px "}
        gridTemplateColumns={"380px 1fr"}
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem
          pl="2"
          bg="pink.300"
          area={"nav"}
          borderRadius="5px"
          backgroundColor="#121212"
          color="#b3b3b3"
          padding="8px 12px"
        >
          {/* <Box
            marginTop={2}
            padding="4px 12px"
            className={"hover:text-white cursor-pointer"}
          >
            <FontAwesomeIcon icon={faHouse} />{" "}
            <span className={"ml-[12px] text-[14px]"}>Home</span>
          </Box>
          <Box
            marginTop={2}
            padding="4px 12px"
            className={"hover:text-white cursor-pointer"}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
            <span className={"ml-[12px] text-[14px]"}>Search</span>
          </Box> */}
          <TopMenu />
        </GridItem>
        <GridItem
          pl="2"
          bg="green.300"
          area={"history"}
          borderRadius="5px"
          backgroundColor="#121212"
          color="#b3b3b3"
          padding="8px 8px"
        >
          {/* <Box marginTop={2} padding="4px 12px">
            <FontAwesomeIcon icon={faLayerGroup} />
            <span className={"ml-[12px] text-[14px]"}>Library</span>
          </Box> */}
          <Library />
        </GridItem>
        <GridItem
          pl="2"
          bg="blue.300"
          area={"main"}
          borderRadius="5px"
          backgroundColor="#121212"
          color="#b3b3b3"
        >
          <Body />
        </GridItem>
      </Grid>
      <MusicPlayer/>
    </div>
  );
};

//========================================================

export default PageHome;
