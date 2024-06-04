import SongListItem from "./SongListItem";

export const SearchPlaylist = ({playlists}) => {
    return (
      <div className="flex flex-col w-full">
        <h2 className="text-[white] text-[24px] my-[16px] font-bold">Playlists</h2>
        <div
          className="grid gap-4 overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(5,minmax(0,1fr))`,
            // gridAutoFlow: "row dense",
          }}
        >
          {playlists.map((playlist, index) => {
            return <SongListItem key={index} musicList={playlist} />;
          })}
        </div>
      </div>
    );
}