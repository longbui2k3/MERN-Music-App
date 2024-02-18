import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SongAPI } from "../api";
import SearchSongList from "./SearchSongList";
import SearchTopResult from "./SearchTopResult";

const SearchComponent = () => {
  let params = useParams();
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const searchSong = async () => {
      try {
        const searchingSong = await SongAPI.searchSong(params.name);
        console.log(searchingSong.data.metadata.songs);
        setSongs(searchingSong.data.metadata.songs[0]);
      } catch (error) {
        console.log(error);
      }
    };
    searchSong();
  }, [params.name]);
  return (
    <div className="">
      <div className="flex gap-8">
        {/* Top result */}
        <SearchTopResult song={songs} className="w-[40%]" />

        {/* //Searched songs list */}
        <SearchSongList className="w-[60%]" />
      </div>
    </div>
  );
};

export default SearchComponent;
