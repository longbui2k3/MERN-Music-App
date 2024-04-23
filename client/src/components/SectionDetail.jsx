import { useState, useEffect } from "react";
import SongListItem from "./SongListItem";
import SectionAPI from "../api/SectionAPI";
import { useParams } from "react-router-dom";
import ArtistItem from "./ArtistItem";

export default function Section() {
  const [section, setSection] = useState({});
  let params = useParams();
  useEffect(() => {
    const getArtistFunc = async () => {
      const data = await SectionAPI.getSectionById(params.id);
      console.log(data);
      setSection(data.data.metadata.section);
    };
    getArtistFunc();
  }, [params.id]);

  return (
    <div
      style={{
        lineHeight: "64px",
        padding: "0 20px",
        maxHeight: "80%",
        overflow: "none",
      }}
    >
      <section aria-label={section.title}>
        <div className="text-[#FFFFFF] font-bold text-[24px] flex justify-between items-center">
          <h2 className="cursor-pointer hover:underline">{section.title}</h2>
        </div>
        <div className="flex gap-4 flex-wrap overflow-hidden">
          {section.lists?.map((item, index) =>
            item.type ? (
              <SongListItem key={index} musicList={item} />
            ) : (
              <ArtistItem singer={item} />
            )
          )}
        </div>
      </section>
    </div>
  );
}
