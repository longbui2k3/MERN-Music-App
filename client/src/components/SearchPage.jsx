import React, { useEffect, useState } from "react";
import { NavigateAuth } from "../context/NavigateContext";
import { useParams } from "react-router-dom";

const SearchPage = ({ children }) => {
  let params = useParams();
  const { navigatePage } = NavigateAuth();
  const [inputSearch, setInputSearch] = useState(params.name);
  function navigateSearchFunc(name) {
    navigatePage(`/search/${name}`);
  }
  return (
    <div className="px-[16px]">
      <div className="ps-[10px] h-[50px] flex items-center justify-left">
        <input
          type="text"
          className="rounded-[30px] w-[364px] py-[6px] px-[36px] h-[90%] bg-[#242424] text-[13px] text-[white]"
          placeholder="What do you want to listen to?"
          value={params.name}
          onChange={(name) => {
            navigateSearchFunc(name.target.value);
            setInputSearch(name.target.value);
          }}
        />
      </div>
      {inputSearch ? (
        <div className="flex my-[15px] ps-[10px]">
          <div className="rounded-[20px] py-[6px] px-[16px] bg-[rgb(35,35,35)] text-[15px] font-semibold text-white me-[10px]">
            All
          </div>
          <div className="rounded-[20px] py-[6px] px-[16px] bg-[rgb(35,35,35)] text-[15px] font-semibold text-white me-[10px]">
            Songs
          </div>
          <div className="rounded-[20px] py-[6px] px-[16px] bg-[rgb(35,35,35)] text-[15px] font-semibold text-white me-[10px]">
            Artists
          </div>
          <div className="rounded-[20px] py-[6px] px-[16px] bg-[rgb(35,35,35)] text-[15px] font-semibold text-white me-[10px]">
            Albums
          </div>
          <div className="rounded-[20px] py-[6px] px-[16px] bg-[rgb(35,35,35)] text-[15px] font-semibold text-white me-[10px]">
            Playlists
          </div>
        </div>
      ) : (
        ""
      )}

      {children}
    </div>
  );
};

export default SearchPage;
