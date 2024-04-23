import { useEffect, useState } from "react";
import { SongAPI, addSongToPlaylist } from "../api";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
export default function SearchBarSong({ setInputSearch, inputSearch, playlist, setSongs }) {
  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [resultSearch, setResultSearch] = useState([]);
  useEffect(() => {
    const getSongsBySearch = async () => {
      try {
        const res = await SongAPI.searchSong(inputSearch);
        setResultSearch(res.data.metadata.songs);
      } catch (err) {
        console.log(err);
      }
    };

    getSongsBySearch();
  }, [inputSearch]);
  return (
    <>
      <div className="flex items-left rounded-lg relative mt-1 mb-4 me-2 ps-1 h-[40px] bg-[rgb(35,35,35)] w-[350px]">
        <div className="search-icon flex flex-col justify-center hover:bg-[rgb(35,35,35)] hover:text-white text-[#b3b3b3] px-1 py-1 relative z-10 rounded-full w-[30px] h-[40px] cursor-pointer">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: "0px auto" }}
          >
            <path
              d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
              stroke="#b3b3b3"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <input
          class={
            "search-input rounded-r-lg text-[14px] font-semibold text-[#b3b3b3] bg-[rgb(35,35,35)] p-[5px] w-full"
          }
          type="search"
          autocomplete="off"
          spellcheck="false"
          aria-live="polite"
          placeholder="Search in Your Songs or Episodes"
          style={{
            transition: "width 0.1s ease-in-out",
          }}
          onChange={handleInputSearch}
        />
      </div>
      <div className="flex flex-col text-white">
        {resultSearch.map((result, index) => (
          <div
            className="flex p-2 pe-3 hover:bg-[#2a2929] rounded-[5px]"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative">
              {playingIndex === index ? (
                <FontAwesomeIcon
                  icon={faPause}
                  onClick={() => setPlayingIndex(null)}
                  className="absolute mx-[14px] my-[12px] text-[22px]"
                  style={{
                    display: `${hoveredIndex === index ? "block" : "none"}`,
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlay}
                  onClick={() => setPlayingIndex(index)}
                  className="absolute mx-[14px] my-[12px] text-[22px]"
                  style={{
                    display: `${hoveredIndex === index ? "block" : "none"}`,
                  }}
                />
              )}

              <img src={result.imageURL} alt="" className="w-[50px] h-[50px]" />
            </div>
            <div className="ms-3 basis-1/2 flex flex-col justify-center">
              {result.name}
            </div>
            <div className="ms-3 basis-1/2 flex flex-col justify-center">
              {result.album.name}
            </div>
            <div className="flex flex-col justify-center">
              <Button
                colorScheme="white"
                variant="outline"
                onClick={async function () {
                  try {
                    const res = await addSongToPlaylist({
                      song: result._id,
                      playlist,
                    });
                    // console.log(res);
                    setSongs(
                      res.data.metadata.playlist.songs
                    );
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
