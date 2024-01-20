import axios from "./axiosConfig";

export const getAllPlaylists = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/playlist`);
  return res;
};
export const getPlaylist = async (id) => {
  const res = await axios.get(`http://localhost:4000/api/v1/playlist/${id}`);
  return res;
};
export const getAllPlayListsByUserId = async (userId) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/playlist/all/${userId}`
  );
  return res;
};

export const createPlaylist = async (userId, data) => {
  const res = await axios.post(
    `http://localhost:4000/api/v1/playlist/all/${userId}`,
    data
  );
  return res;
};
