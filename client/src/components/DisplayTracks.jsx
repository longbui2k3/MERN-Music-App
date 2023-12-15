const DisplayTrack = ({
  currentTrack,
  audioRef,
  progressBarRef,
  setDuration,
  handleNext
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  return (
    <div>
      <audio
        src={currentTrack.songURL}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
};
export default DisplayTrack;
