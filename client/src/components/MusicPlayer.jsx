import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import OtherControls from "./OtherControls.jsx";
import ProgressBar from "./ProgressBar.jsx";
import ShortInfo from "./ShortInfo";
import SongAPI from "../api/SongAPI.js";
const MusicPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const songFunc = async () => {
      try {
        const res = await SongAPI.getAllSong();
        setTracks(res.data.metadata.songs);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    songFunc();
  }, []);
  useEffect(() => {
    if (tracks) setCurrentTrack(tracks[trackIndex]);
  }, [tracks]);
  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div className="bg-black p-[10px] flex w-full h-full">
      <div className="w-1/3">
        <ShortInfo currentTrack={currentTrack} audioRef={audioRef} />
      </div>
      <div className="w-1/3 grid gap-y-0 grid-cols-1 p-[2px]">
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
      <div className="w-1/3 flex justify-center items-center">
        <OtherControls audioRef={audioRef} />
      </div>
    </div>
  );
};

export default MusicPlayer;
