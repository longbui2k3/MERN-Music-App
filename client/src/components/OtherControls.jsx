import { faVolumeHigh, faVolumeLow, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

const OtherControls = () => {
    const [muteVolume, setMuteVolume] = useState(false);
  const [volume, setVolume] = useState(60);
  return (
    <>
         <div className="volume w-[120px] flex flex-row gap-[8px] justify-center items-center" >
          <div onClick={() => setMuteVolume((prev) => !prev)}>
            {muteVolume || volume < 5 ? (
              <FontAwesomeIcon icon={faVolumeOff} className="text-white text-opacity-50 hover:text-opacity-100 w-[22px]"/>
            ) : volume < 40 ? (
              <FontAwesomeIcon icon={faVolumeLow} className="text-white text-opacity-50 hover:text-opacity-100 w-[22px]"/>
            ) : (
              <FontAwesomeIcon icon={faVolumeHigh} className="text-white text-opacity-50 hover:text-opacity-100 w-[22px]" />
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
              margin: "auto"
            }}
          />
        </div>
    </>
  )
}

export default OtherControls