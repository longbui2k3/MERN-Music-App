import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../config/firebase";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  progressBarRef,
  setDuration,
  handleNext,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const getStorage = storage;
  const [url, setUrl] = useState("");
  useEffect(() => {
    async function getUrl() {
      const downloadedUrl = await getDownloadURL(
        ref(getStorage, "songs/" + currentTrack.songURL)
      );
      setUrl(downloadedUrl);
    }
    getUrl();
  }, []);
  return (
    <div>
      <audio
        src={url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
};
export default DisplayTrack;
