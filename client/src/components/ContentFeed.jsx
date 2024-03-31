import React from "react";
import ContentCard from "./ContentCard";

export default function ContentFeed() {
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
          <ContentCard />
        </div>
      </div>
    </>
  );
}
