import React from "react";
import SongListItem from "./SongListItem";

export default function Section({ section }) {
  return (
    <section aria-label={section.title}>
      <div className="text-[#FFFFFF] font-bold text-[24px] flex justify-between items-center">
        <h2 className="cursor-pointer hover:underline">{section.title}</h2>
        <div className="text-[#B3B3B3] text-[14px] cursor-pointer hover:underline">
          Show All
        </div>
      </div>
      <div className="flex gap-4 flex-wrap overflow-hidden">
        {section.listSongs.map((item, index) => (
          <SongListItem key={index} listSong={item} />
        ))}
      </div>
    </section>
  );
}
