import { Tooltip } from "@chakra-ui/react";
import { useEffect } from "react";
import { getItemsByUserId } from "../api";

export default function SearchBarLibrary({
  searchRef,
  setItems,
  inputSearch,
  setInputSearch,
  typeSearch,
}) {
  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };
  useEffect(() => {
    const getMusicListsBySearch = async () => {
      try {
        const res = await getItemsByUserId({
          search: inputSearch,
          type: typeSearch.newType,
        });
        console.log(res);
        if (res.data.status === 200) {
          setItems(res.data.metadata.items);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMusicListsBySearch();
  }, [inputSearch, typeSearch.newType]);
  const openSearchBar = (event) => {
    document.querySelector(".search-input").style = "width: 160px;";
    console.log("long");
  };
  return (
    <div
      className="flex justify-center items-center rounded-lg relative mt-1 me-2 h-[30px] bg-[rgb(35,35,35)]"
      ref={searchRef}
    >
      <Tooltip
        label="Search in Your Library"
        placement="top-start"
        bg="rgb(40,40,40)"
      >
        <div
          className="search-icon flex flex-col justify-center hover:bg-[rgb(35,35,35)] hover:text-white text-[#b3b3b3] px-1 py-1 relative z-10 rounded-full w-[30px] h-[30px] cursor-pointer"
          onClick={openSearchBar}
        >
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Tooltip>
      <input
        className={
          "search-input rounded-r-lg text-[14px] text-[#b3b3b3] bg-[rgb(35,35,35)] p-[5px] w-0"
        }
        type="search"
        autoComplete="off"
        spellCheck="false"
        aria-live="polite"
        placeholder="Search in Your Library"
        style={{
          transition: "width 0.1s ease-in-out",
        }}
        onChange={handleInputSearch}
      />
    </div>
  );
}
