import SongListItem from "./SongListItem";

export const SearchAlbumList = ({albums}) => {
    return (
      <div className="flex flex-col w-full">
        <h2 className="text-[white] text-[24px] my-[16px] font-bold">
          Albums
        </h2>
        <div
          className="grid gap-4 overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(5,minmax(0,1fr))`,
            // gridAutoFlow: "row dense",
          }}
        >
          {albums.map((album, index) => {
            return <SongListItem key={index} musicList={album} />;
          })}
        </div>
      </div>
    );
}