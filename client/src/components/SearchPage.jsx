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
          <div
            className={`rounded-[20px] py-[6px] px-[16px] text-[15px] font-semibold me-[10px]`}
            style={{
              backgroundColor: `${!params.type ? "white" : "rgb(35,35,35)"}`,
              color: `${!params.type ? "rgb(35,35,35)" : "white"}`,
            }}
            onClick={function (e) {
              navigatePage(`/search/${inputSearch}`);
            }}
            onMouseOver={function (e) {
              if (params.type) e.target.style.backgroundColor = "rgb(50,50,50)";
            }}
            onMouseOut={function (e) {
              e.target.style.backgroundColor = `${
                !params.type ? "white" : "rgb(35,35,35)"
              }`;
            }}
          >
            All
          </div>
          <div
            className="rounded-[20px] py-[6px] px-[16px] text-[15px] font-semibold me-[10px]"
            style={{
              background: `${
                params.type === "songs" ? "white" : "rgb(35, 35, 35)"
              }`,
              color: `${params.type === "songs" ? "rgb(35,35,35)" : "white"}`,
            }}
            onClick={function (e) {
              navigatePage(`/search/${inputSearch}/songs`);
            }}
            onMouseOver={function (e) {
              if (params.type !== "songs")
                e.target.style.backgroundColor = "rgb(50,50,50)";
            }}
            onMouseOut={function (e) {
              e.target.style.backgroundColor = `${
                params.type === "songs" ? "white" : "rgb(35,35,35)"
              }`;
            }}
          >
            Songs
          </div>
          <div
            className="rounded-[20px] py-[6px] px-[16px] text-[15px] font-semibold me-[10px]"
            style={{
              background: `${
                params.type === "artists" ? "white" : "rgb(35, 35, 35)"
              }`,
              color: `${params.type === "artists" ? "rgb(35,35,35)" : "white"}`,
            }}
            onClick={function (e) {
              navigatePage(`/search/${inputSearch}/artists`);
            }}
            onMouseOver={function (e) {
              if (params.type !== "artists")
                e.target.style.backgroundColor = "rgb(50,50,50)";
            }}
            onMouseOut={function (e) {
              e.target.style.backgroundColor = `${
                params.type === "artists" ? "white" : "rgb(35,35,35)"
              }`;
            }}
          >
            Artists
          </div>
          <div
            className="rounded-[20px] py-[6px] px-[16px] text-[15px] font-semibold me-[10px]"
            style={{
              background: `${
                params.type === "albums" ? "white" : "rgb(35, 35, 35)"
              }`,
              color: `${params.type === "albums" ? "rgb(35,35,35)" : "white"}`,
            }}
            onClick={function (e) {
              navigatePage(`/search/${inputSearch}/albums`);
            }}
            onMouseOver={function (e) {
              if (params.type !== "albums")
                e.target.style.backgroundColor = "rgb(50,50,50)";
            }}
            onMouseOut={function (e) {
              e.target.style.backgroundColor = `${
                params.type === "albums" ? "white" : "rgb(35,35,35)"
              }`;
            }}
          >
            Albums
          </div>
          <div
            className="rounded-[20px] py-[6px] px-[16px] text-[15px] font-semibold me-[10px]"
            style={{
              background: `${
                params.type === "playlists" ? "white" : "rgb(35, 35, 35)"
              }`,
              color: `${
                params.type === "playlists" ? "rgb(35,35,35)" : "white"
              }`,
            }}
            onClick={function (e) {
              navigatePage(`/search/${inputSearch}/playlists`);
            }}
            onMouseOver={function (e) {
              if (params.type !== "playlists")
                e.target.style.backgroundColor = "rgb(50,50,50)";
            }}
            onMouseOut={function (e) {
              e.target.style.backgroundColor = `${
                params.type === "playlists" ? "white" : "rgb(35,35,35)"
              }`;
            }}
          >
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
