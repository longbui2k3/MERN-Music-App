import axios from "./axiosConfig";

export const getAllAlbums = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/album`);
  return res;
};
export const getAlbum = async (id) => {
  const res = await axios.get(`http://localhost:4000/api/v1/album/${id}`);
  return res;
};
