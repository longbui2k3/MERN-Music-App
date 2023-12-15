import React from "react";
import Library from "./Library";
import TopMenu from "./TopMenu";
import Body from "./Body";
import MusicPlayer from "./MusicPlayer";
import { styled } from "styled-components";

const Container = styled.div`
  max-height: 100vh;
  max-width: 100vw;
  display: grid;
  grid-template-rows: 89vh 11vh;
  overflow: hidden;
  .body {
    display: grid;
    grid-template-columns: 20% 80%;
    column-gap: 8px;
    height: 100%;
    width: 100%;
    background-color: rgb(0 0 0);
    padding: 8px 15px 0 8px;
  }
  .side-bar {
    background-color: black;
    color: #b3b3b3;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 15% 83.7%;
    row-gap: 8px;
  }

  .top-menu {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    padding: 8px 8px;
  }

  .library {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    padding: 8px 8px;
  }

  .body-content {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
  }

  .footer {
    z-index: 100;
  }
`;

const PageHome = () => {
  return (
    <Container>
      <div className="body">
        <div className="side-bar">
          <div className="top-menu">
            <TopMenu />
          </div>

          <div className="library">
            <Library />
          </div>
        </div>
        <div className="body-content">
          <Body />
        </div>
      </div>
      <div className="footer">
        <MusicPlayer />
      </div>
    </Container>
  );
};

//========================================================

export default PageHome;
