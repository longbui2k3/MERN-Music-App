export default function HeaderCover({ type, name, description }) {
  return (
    <div className="w-full mx-0 my-0.5 flex items-center gap-0.5 pl-[20px] pr-[20px] ">
      <div className="image">
        <img
          className="h-60 shadow-2xl w-[128px] h-[128px] rounded-[4px] mr-[16px]"
          src="https://misc.scdn.co/liked-songs/liked-songs-640.png"
          alt="Selected Playlist"
        />
      </div>
      <div className="flex flex-col gap-4 text-gray-300">
        <span className="type">{type}</span>
        <h1 className="text-white text-6xl font-bold">{name}</h1>
        <div className="description">{description}</div>
      </div>
    </div>
  );
}
