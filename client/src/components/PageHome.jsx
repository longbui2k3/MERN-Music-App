import React from "react";
import { useState, useEffect, useRef } from "react";
import "../styles/sidebar.css";
import Library from "./Library";
import TopMenu from "./TopMenu";
import Header from "./Header";
import MusicPlayer from "./MusicPlayer";
import { styled } from "styled-components";
import { useResizeDetector } from "react-resize-detector";
import Footer from "./Footer";
import EditPlaylist from "./EditPlaylist";
import { useDispatch, useSelector } from "react-redux";
import EditSection from "./adminRole/EditSection";
import AddListsToSection from "./adminRole/AddListsToSection";
const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 88vh 11vh;
  background-color: rgb(0 0 0);
  .body {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    overflow: auto;
  }
  .footer {
    z-index: 3;
  }
  .top-menu {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    padding: 8px 0px 8px 8px;
    margin-bottom: 8px;
  }
  .library {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    padding: 8px 0px 8px 8px;
    z-index: 5;
  }
`;
function PageHome({ children }) {
  const sidebarRef = useRef(null);
  const sidebarRef2 = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isResizing2, setIsResizing2] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(360);
  const [sidebarWidth2, setSidebarWidth2] = useState(350);
  const isOpenQueue = useSelector((state) => state.queue.isOpenQueue);
  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const startResizing2 = React.useCallback((mouseDownEvent) => {
    setIsResizing2(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const stopResizing2 = React.useCallback(() => {
    setIsResizing2(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );
  const appContainerRef = useRef();
  const resize2 = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing2) {
        const value =
          appContainerRef.current.getBoundingClientRect().width -
          mouseMoveEvent.clientX;
        setSidebarWidth2(value);
      }
    },
    [isResizing2]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  React.useEffect(() => {
    window.addEventListener("mousemove", resize2);
    window.addEventListener("mouseup", stopResizing2);
    return () => {
      window.removeEventListener("mousemove", resize2);
      window.removeEventListener("mouseup", stopResizing2);
    };
  }, [resize2, stopResizing2]);

  const { width, height, ref } = useResizeDetector();
  const { width2, height2, ref2 } = useResizeDetector();
  const [resizeStyle, setResizeStyle] = useState(false);
  const [resizeStyle2, setResizeStyle2] = useState(false);
  useEffect(() => {
    if (width < 223) {
      setResizeStyle(true);
    } else {
      setResizeStyle(false);
    }
  }, [width]);
  useEffect(() => {
    if (width2 < 300) {
      setResizeStyle2(true);
    } else {
      setResizeStyle2(false);
    }
  }, [width2]);
  const editPlaylist = useSelector((state) => state.editForm.editPlaylist);
  const editSection = useSelector((state) => state.editForm.editSection);
  const addListsToSection = useSelector(
    (state) => state.editForm.addListsToSection
  );
  return (
    <Container>
      {editPlaylist ? (
        <EditPlaylist />
      ) : editSection ? (
        <EditSection />
      ) : addListsToSection ? (
        <AddListsToSection />
      ) : (
        ""
      )}
      <div className="app-container h-full" ref={appContainerRef}>
        <div
          ref={sidebarRef}
          className={"app-sidebar w-[360px]"}
          style={{ width: sidebarWidth < 290 ? 93 : sidebarWidth }}
        >
          <div className={"app-sidebar-content flex flex-col "}>
            <div className="h-[120px] top-menu">
              <TopMenu />
            </div>
            <div className="library grow">
              <Library />
            </div>
          </div>

          <div className={"app-sidebar-resizer"} onMouseDown={startResizing} />
        </div>
        <div className="app-frame">
          <Header />
          <div className="body h-full">
            <div className="body_content">{children}</div>
            <div>
              <Footer />
            </div>
          </div>
        </div>

        {isOpenQueue ? (
          <div
            ref={sidebarRef2}
            className={"app-sidebar2 bg-[#121212] ms-[8px]"}
            style={{ width: sidebarWidth2 }}
          >
            <div
              className={"app-sidebar-resizer2"}
              onMouseDown={startResizing2}
            />
            <div className={"app-sidebar-content"}></div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="footer">
        <MusicPlayer />
      </div>
    </Container>
  );
}

export default PageHome;
