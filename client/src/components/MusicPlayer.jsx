import React, { useEffect, useRef, useState } from "react";
import { tracks } from "../data/tracks.js";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar.jsx";
import ShortInfo from "./ShortInfo";
import OtherControls from "./OtherControls.jsx";
const MusicPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference

  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div className="bg-black h-[84px] p-[10px] flex" width="100%">
      <div className="w-1/3">
        <ShortInfo currentTrack={currentTrack} audioRef={audioRef} />
      </div>
      <div className="w-1/3 ">
        <Controls
          currentTrack={currentTrack}
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          setDuration={setDuration}
          duration={duration}
          setTimeProgress={setTimeProgress}
          tracks={tracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          setCurrentTrack={setCurrentTrack}
        />
        <ProgressBar
          timeProgress={timeProgress}
          duration={duration}
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          setDuration={setDuration}
        />
      </div>
      <div className="w-1/3 flex justify-center	justify-center items-center	">
        <OtherControls />

      </div>
    </div>
  );
};

export default MusicPlayer;
