const ProgressBar = ({ timeProgress, duration, audioRef, progressBarRef }) => {
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  return (
    <div className="progress flex flex-row justify-center gap-[8px] items-center">
      <span className="time current text-[11px]" style={{ color: "#A7A7A7" }}>
      {formatTime(timeProgress)}
      </span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
        style={{margin: "auto"}}
      />
      <span className="time text-[11px]" style={{ color: "#A7A7A7" }}>
      {formatTime(duration)}
      </span>
    </div>
  );
};
export default ProgressBar;
