export default function SongItem({ song, index }) {
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div className="py-2 px-4 grid grid-cols-[0.1fr_3.2fr_0.4fr] hover:bg-[#000000b3] cursor-pointer">
      <div className="flex items-center text-[#dddcdc]">
        <span>{index + 1}</span>
      </div>
      <div className="flex items-center text-[#dddcdc] gap-4">
        <div className="h-[40px]">
          <img src={song.image} alt="track" />
        </div>
        <div className="flex flex-col">
          <span className="name">{song.name}</span>
          <span>{song.artists}</span>
        </div>
      </div>
      <div className="flex items-center text-[#dddcdc] justify-center">
        <span>{msToMinutesAndSeconds(10000)}</span>
      </div>
    </div>
  );
}
