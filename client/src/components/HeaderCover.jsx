import React from "react";

export default function HeaderCover() {
  return (
    <div className="w-full mx-0 my-0.5 flex items-center gap-0.5">
      <div className="image">
        <img className="h-60 shadow-2xl" src="#" alt="selectedPlaylist" />
      </div>
      <div className="flex flex-col gap-4 text-gray-300">
        <span className="type">Playlist</span>
        <h1 className="text-white text-6xl font-bold">Name</h1>
        <div className="description">Description</div>
      </div>
    </div>
  );
}
