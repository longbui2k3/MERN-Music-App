import axios from "./axiosConfig";

export const createAlbum = async (name, genres, description, file, singers) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("name", name);
  formData.append("genres", genres);
  formData.append("description", description);
  formData.append("musiclist_attributes", JSON.stringify({ singers }));
  const res = await axios.post(`http://localhost:4000/api/v1/album/`, formData);

  return res;
};

export const getAlbumById = async (id) => {
  const res = await axios.get(`http://localhost:4000/api/v1/album/${id}`);
  return res;
};

export const getAllAlbums = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/album`);
  return res;
};
