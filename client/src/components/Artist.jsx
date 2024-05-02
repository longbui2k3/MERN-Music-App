import React, { useEffect, useState } from "react";
import { SingerAPI } from "../api";
import HeaderCoverArtist from "./HeaderCoverArtist";
import { useParams } from "react-router-dom";
import ActionBarArtist from "./ActionBarArtist";
import SongListItem from "./SongListItem";
import SongItem from "./SongItem";

export default function Artist() {
  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [albums, setAlbums] = useState([]);
  let params = useParams();
  useEffect(() => {
    const getArtistFunc = async () => {
      const data = await SingerAPI.getSingerById(params.id);
      setArtist(data.data.metadata.singer);
      setSongs(data.data.metadata.singer.songs);
      setAlbums(data.data.metadata.singer.listSongs);
    };
    getArtistFunc();
  }, [params.id]);

  useEffect(() => {
    if (artist?.name) {
      document.title = artist.name;
    }
  }, [artist]);

  function handleClickMore() {
    setShowAll((preState) => !preState);
  }

  return (
    <>
      <HeaderCoverArtist artist={artist} />
      <ActionBarArtist />
      {songs && (
        <section className="pl-[20px] pr-[20px]">
          <h2 className="text-white text-2xl font-bold pb-3">Popular</h2>
          <div className="mx-[1rem] flex flex-col pb-10 w-[40%]">
            {songs.length <= 5
              ? songs.map((song, index) => (
                  <SongItem key={song._id} song={song} index={index} />
                ))
              : showAll
              ? songs.map((song, index) => (
                  <SongItem key={song._id} song={song} index={index} />
                ))
              : songs
                  .slice(0, 5)
                  .map((song, index) => (
                    <SongItem key={song._id} song={song} index={index} />
                  ))}
            {songs.length > 5 && (
              <button
                className="w-16 text-1xl font-bold hover:text-white"
                onClick={handleClickMore}
              >
                More
              </button>
            )}
          </div>
        </section>
      )}

      {albums && (
        <section className="pl-[20px] pr-[20px]">
          <h2 className="text-white text-2xl font-bold pb-3">List of Albums</h2>
          <div
            style={{
              lineHeight: "64px",
              maxHeight: "80%",
              overflow: "none",
            }}
          >
            {albums.map((item, index) => (
              <SongListItem key={index} listSong={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
