import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingerAPI } from "../api";
import SongListItem from "./SongListItem";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/discography/discographySlice";

export const Discography = () => {
  let params = useParams();
  const [albums, setAlbums] = useState([]);
  const [columnCount, setColumnCount] = useState(6);
  const sidebarSize = useSelector((state) => state.resize.sidebarSize);
  const appContainerSize = useSelector(
    (state) => state.resize.appContainerSize
  );
  useEffect(() => {
    setColumnCount(Math.floor((appContainerSize - sidebarSize) / 230));
  }, [sidebarSize]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getAlbumBySinger = async () => {
      try {
        const res1 = await SingerAPI.getAlbumBySinger(params.id);
        setAlbums(res1.data.metadata.albums);

        const res2 = await SingerAPI.getSingerById(params.id);
        dispatch(setName(res2.data.metadata.singer.name));
      } catch (err) {
        console.log(err);
      }
    };
    getAlbumBySinger();
  }, []);
  return (
    <>
      <div
        style={{
          lineHeight: "64px",
          paddingTop: "50px",
          maxHeight: "80%",
          overflow: "none",
        }}
      >
        <div
          // className="mx-8 mb-3 flex gap-4 flex-wrap overflow-hidden"
          className="mx-[20px] mb-3 grid-songs grid gap-4 overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${columnCount},minmax(0,1fr))`,
            // gridAutoFlow: "row dense",
          }}
        >
          {albums?.map((item, index) => (
            <SongListItem key={index} musicList={item} />
          ))}
        </div>
      </div>
    </>
  );
};
