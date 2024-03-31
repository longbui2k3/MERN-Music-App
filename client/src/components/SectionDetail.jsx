import { useState, useEffect } from "react";
import SongListItem from "./SongListItem";
import SectionAPI from "../api/SectionAPI";
import { useParams } from "react-router-dom";

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
    <section aria-label={section.title}>
      <div className="text-[#FFFFFF] font-bold text-[24px] flex justify-between items-center">
        <h2 className="cursor-pointer hover:underline">{section.title}</h2>
      </div>
      <div className="flex gap-4 flex-wrap overflow-hidden">
        {section.lists?.map((item, index) => (
          <SongListItem key={index} musicList={item} />
        ))}
      </div>
    </section>
  );
}
