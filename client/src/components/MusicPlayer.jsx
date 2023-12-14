import { faBackwardStep, faCirclePlay, faForwardStep, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const MusicPlayer = () => {
  return (
    <div className="bg-black h-[72px] p-[10px] flex" width="100%">
    <div className="w-1/3"></div>
    <div className="w-1/3 flex-col">
      <div className="flex  justify-center gap-[20px] items-center">
        <div className="text-[16px] text-white text-opacity-50 hover:text-opacity-100">
          <FontAwesomeIcon icon={faShuffle} />
        </div>
        <div className="text-[22px] text-white text-opacity-50 hover:text-opacity-100">
          <FontAwesomeIcon icon={faBackwardStep} />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="text-[36px] text-white text-opacity-90 hover:text-opacity-100"
          />
        </div>
        <div className="text-[22px] text-white text-opacity-50 hover:text-opacity-100">
          <FontAwesomeIcon icon={faForwardStep} />
        </div>
        <div className="text-[16px] text-white text-opacity-50 hover:text-opacity-100">
          <FontAwesomeIcon icon={faRepeat} />
        </div>
      </div>
      <div>
        <>
          {/* <audio
            controls
            src="https://rr1---sn-hp57ynse.googlevideo.com/videoplayback?expire=1702241557&ei=tdB1ZZLBDoaEy_sP5e-nyAg&ip=103.195.101.144&id=o-ACmslioTiH_DxlNBhV9itdIsLp1Bs4-1gaoTkTtUhv9r&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=YW&mm=31%2C29&mn=sn-hp57ynse%2Csn-hp57knd6&ms=au%2Crdu&mv=u&mvi=1&pl=24&spc=UWF9f_o_gpyLb-jO5lUy2LaNDMoekW4-tgawfLG23g&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=5MpeNrGmroHv-RhtDNTl0ZgP&gir=yes&clen=3285054&dur=202.919&lmt=1677787947034523&mt=1702219778&fvip=3&keepalive=yes&fexp=24007246&c=WEB&txp=5532434&n=ZUFnzqCgrj43bbQPS&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AAO5W4owRgIhAPZnyOAqN8sMxRhTLevs7QYxAWHuZPxAspjgB9QjgIJBAiEAsTuKFBXpK_L2FpnhkJq1oBa_MImg2soW_svcF-Hzhrg%3D&sig=AJfQdSswRAIgOG6WZcbAepmPcDlByIF2-jghRFXlfjXHrr8YYI3dvF4CIBeALlJSv4cXh7BEjUHOYtYqfJYScaSbBaRVKub39m5O"
          ></audio> */}
        </>
      </div>
    </div>
    <div className="w-1/3"></div>
  </div>  )
}

export default MusicPlayer