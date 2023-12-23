import {
  faBackwardStep,
  faCirclePause,
  faCirclePlay,
  faForwardStep,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DisplayTrack from "./DisplayTracks";

const Controls = ({
  currentTrack,
  audioRef,
  progressBarRef,
  setDuration,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    if (audioRef.current !== null) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <>
      <div className="flex-col">
        <div className="flex  justify-center gap-[20px] items-center">
          <div className="text-[16px] text-white text-opacity-50 hover:text-opacity-100">
            <FontAwesomeIcon icon={faShuffle} />
          </div>
          <div
            onClick={handlePrevious}
            className="text-[22px] text-white text-opacity-50 hover:text-opacity-100"
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </div>
          <div onClick={togglePlayPause}>
            {" "}
            {isPlaying ? (
              <FontAwesomeIcon
                icon={faCirclePause}
                className="text-[36px] text-white text-opacity-90 hover:text-opacity-100"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="text-[36px] text-white text-opacity-90 hover:text-opacity-100"
              />
            )}
          </div>
          <div
            onClick={handleNext}
            className="text-[22px] text-white text-opacity-50 hover:text-opacity-100"
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </div>
          <div className="text-[16px] text-white text-opacity-50 hover:text-opacity-100">
            <FontAwesomeIcon icon={faRepeat} />
          </div>
        </div>
        <div>
          <>
            <DisplayTrack
              currentTrack={currentTrack}
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              setDuration={setDuration}
              handleNext={handleNext}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default Controls;
