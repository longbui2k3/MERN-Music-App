import axios from "./axiosConfig";

export const searchGenres = async (search = "") => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/genre?search=${search}`
  );
  return res;
};

export const getGenres = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/genre`);
  return res;
}

export const getGenre = async(id) => {
  const res = await axios.get(`http://localhost:4000/api/v1/genre/${id}`);
  return res;
}