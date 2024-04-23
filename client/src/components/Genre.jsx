import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGenre } from "../api";

export default function Genre() {
  const [genre, setGenre] = useState({});
  let params = useParams();

  useEffect(() => {
    const getGenreFunc = async () => {
      try {
        const res = await getGenre(params.id);
        console.log(res);
        setGenre(res.data.metadata.genre);
      } catch (err) {
        console.log(err);
      }
    };
    getGenreFunc();
  }, [params.id]);
  useEffect(() => {
    console.log(genre);
  }, [genre]);
  return (
    <>
      <div className="h-[250px] w-full mx-0 my-0.5 flex items-end pl-[20px] pr-[20px] pb-[40px] bg-slate-400">
        <h1 className="text-white text-8xl font-bold">{genre.name}</h1>
      </div>
    </>
  );
}
