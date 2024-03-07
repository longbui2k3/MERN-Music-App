import React, { useEffect } from "react";
import { NavigateAuth } from "../context/NavigateContext";

const SearchPage = ({ children }) => {
  const { navigatePage } = NavigateAuth();

  function navigateSearchFunc(name) {
    navigatePage(`/search/${name}`);
  }
  return (
    <div className="px-[16px]">
      <div className="h-[50px] flex items-center justify-left">
        <input
          type="text"
          className="rounded-[30px] w-[364px] py-[6px] px-[36px] h-[90%] bg-[#242424] text-[13px] text-[white]"
          placeholder="What do you want to listen to?"
          onChange={(name) => {
            navigateSearchFunc(name.target.value);
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default SearchPage;
