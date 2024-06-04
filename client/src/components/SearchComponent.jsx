import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SongAPI, searchLists } from "../api";
import SearchSongList from "./SearchSongList";
import SearchTopResult from "./SearchTopResult";
import { SearchArtistList } from "./SearchArtistList";
import { SearchAlbumList } from "./SearchAlbumList";
import { SearchPlaylist } from "./SearchPlaylist";

const SearchComponent = () => {
  let params = useParams();
  const [topResults, setTopResults] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const search = async () => {
      try {
        const searching = await searchLists(params.name);
        setTopResults(searching.data.metadata.lists.songs[0]);
        setSongs(searching.data.metadata.lists.songs);
        setArtists(searching.data.metadata.lists.singers);
        setAlbums(searching.data.metadata.lists.albums);
        setPlaylists(searching.data.metadata.lists.playlists);
      } catch (error) {
        console.log(error);
      }
    };
    search();
  }, [params.name]);
  return (
    <div>
      <div className="flex gap-8 ps-[10px]">
        {/* Top result */}
        <SearchTopResult song={topResults} className="w-[40%]" />

        {/* //Searched songs list */}
        {songs.length ? <SearchSongList className="w-[60%]" songs={songs} /> : ""}
      </div>
      {artists.length ? (
        <div
          style={{
            lineHeight: "64px",
            padding: "0 10px",
            maxHeight: "80%",
            overflow: "none",
          }}
        >
          <SearchArtistList artists={artists} />
        </div>
      ) : (
        ""
      )}
      {albums.length ? (
        <div
          style={{
            lineHeight: "64px",
            padding: "0 10px",
            maxHeight: "80%",
            overflow: "none",
          }}
        >
          <SearchAlbumList albums={albums} />
        </div>
      ) : (
        ""
      )}
      {playlists.length ? (
        <div
          style={{
            lineHeight: "64px",
            padding: "0 10px",
            maxHeight: "80%",
            overflow: "none",
          }}
        >
          <SearchPlaylist playlists={playlists} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchComponent;
