import React, { useEffect, useState } from "react";
import { getGenres } from "../api";
import { NavigateAuth } from "../context/NavigateContext";

const SearchStartPage = () => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGenresFunc = async () => {
      try {
        const res = await getGenres();
        setGenres(res.data.metadata.genres);
      } catch (err) {}
    };
    getGenresFunc();
  }, []);
  useEffect(() => {
    console.log(genres);
  }, [genres]);
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const {navigatePage} = NavigateAuth();
 
  return (
    <div>
      <h2 className="text-[white] text-[24px] mt-[32px] mb-[16px] font-bold	">
        Browse all
      </h2>
      <div className="flex gap-3 flex-wrap overflow-hidden">
        {genres.map((genre, index) => {
          return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <div
              className={`rounded-[8px] h-[159px] w-[159px] overflow-hidden`}
              onClick={() => {
                navigatePage(`/genre/${genre._id}`)
              }}
              style={{ backgroundColor: getRandomColor() }}
            >
              <h3 className="p-[16px] font-semibold	text-[20px] text-[white]">
                {genre.name}
              </h3>
              <div>
                <img
                  alt="genre"
                  className="w-[100px] h-[100px] transform rotate-[25deg] ml-[50%]"
                  src={genre.imageURL}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchStartPage;
