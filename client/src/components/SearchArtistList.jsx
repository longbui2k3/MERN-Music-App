import ArtistItem from "./ArtistItem";

export const SearchArtistList = ({ artists, removeTitle }) => {
  return (
    <div className="flex flex-col w-full">
      {removeTitle ? (
        ""
      ) : (
        <h2 className="text-[white] text-[24px] my-[16px] font-bold">
          Artists
        </h2>
      )}
      <div
        className="grid gap-4 overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(5,minmax(0,1fr))`,
          // gridAutoFlow: "row dense",
        }}
      >
        {artists.map((artist, index) => {
          return <ArtistItem singer={artist} />;
        })}
      </div>
    </div>
  );
};
