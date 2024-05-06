import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import { getNewInfoFromFollowedSingers } from "../api/UserAPI";

export default function ContentFeed() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const newsFunc = async () => {
      try {
        const res = await getNewInfoFromFollowedSingers();
        console.log(res.data.metadata.newInfo);
        setNews(res.data.metadata.newInfo);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    newsFunc();
  }, []);

  return (
    <>
      <div className="m-6">
        <h1 className="text-white text-3xl font-bold pb-3">Thông tin mới</h1>
        <p className="text-[#A7A7A7] text-sm">
          Nội dung phát hành mới nhất từ nghệ sĩ, podcast và chương trình bạn
          theo dõi.
        </p>
        <div className="filter"></div>
        <div className="pt-5">
          <h3 className="text-white text-2xl font-bold pb-3">Trước đó</h3>
          <div className="flex flex-col gap-8 overflow-auto">
            {news ? (
              news.map((album) => <ContentCard key={album._id} album={album} />)
            ) : (
              <p className="text-white text-2xl font-bold pb-3">
                Nothing is new
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
