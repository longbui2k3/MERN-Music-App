import axios from "./axiosConfig";

export const searchGenres = async (search) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/genre?search=${search}`
  );
  return res;
};
