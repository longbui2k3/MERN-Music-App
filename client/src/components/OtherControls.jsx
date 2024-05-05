import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { HiOutlineQueueList } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { toggleQueue } from "../features/queue/queueSlice";

const OtherControls = ({ audioRef }) => {
  const [muteVolume, setMuteVolume] = useState(false);
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);
  const isOpenQueue = useSelector((state) => state.queue.isOpenQueue);
  const dispatch = useDispatch();
  return (
    <>
      <HiOutlineQueueList
        className="text-white text-opacity-50 w-[22px] text-[30px] hover:text-opacity-100"
        onClick={function (e) {
          dispatch(toggleQueue());
        }}
        style={{
          color: `${isOpenQueue ? "#1db954" : ""}`,
        }}
      />
      <div className="volume w-[120px] flex flex-row gap-[8px] justify-center items-center">
        <div onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <FontAwesomeIcon
              icon={faVolumeOff}
              className="text-white text-opacity-50 hover:text-opacity-100 w-[22px]"
            />
          ) : volume < 40 ? (
            <FontAwesomeIcon
              icon={faVolumeLow}
              className="text-white text-opacity-50 hover:text-opacity-100 w-[22px]"
            />
          ) : (
            <FontAwesomeIcon
              icon={faVolumeHigh}
              className="text-white text-opacity-50 hover:text-opacity-100 w-[22px]"
            />
          )}
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, white ${volume}%, gray ${volume}%)`,
            margin: "auto",
          }}
        />
      </div>
    </>
  );
};

export default OtherControls;
