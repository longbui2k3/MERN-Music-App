import { Image } from "@chakra-ui/react";
import React from "react";

const ShortInfo = ({currentTrack}) => {
  return (
    <>
      <div className="flex flex-row gap-[15px]">
        <div style={{ with: "20%" }}>
          <Image
            boxSize="64px"
            className="rounded-[5px]"
            objectFit="cover"
            src={currentTrack?.imageURL}
            alt={currentTrack?.description}
          />
        </div>
        <div className="flex flex-col justify-center" style={{ with: "20%" }}>
          <p className="text-[14px] text-white ">{currentTrack?.name}</p>
          <p className="text-[11px] text-white text-opacity-70	">RPT MCK</p>
        </div>
      </div>
    </>
  );
};

export default ShortInfo;
