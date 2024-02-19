export default function HeaderCoverArtist({ artist }) {
  return (
    <div className="h-[250px] w-full mx-0 my-0.5 flex items-end pl-[20px] pr-[20px] pb-[20px] bg-slate-400">
      <div className="flex flex-col gap-4 text-gray-300 items-stretch">
        <div className="flex items-center justify-start gap-x-2">
          <span className="icon">
            <img
              width="26"
              height="26"
              src="https://img.icons8.com/color/48/verified-badge.png"
              alt="verified-badge"
            />
          </span>
          <span className="type">Verified Artist</span>
        </div>
        <h1 className="text-white text-6xl font-bold">{artist.name}</h1>
        <div className="listener">1.000.000 monthly listener</div>
      </div>
    </div>
  );
}
