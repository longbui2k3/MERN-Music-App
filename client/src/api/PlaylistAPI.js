import axios from "axios";

export const getAllPlaylists = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/playlist`);
  return res;
};
export const getPlaylist = async (id) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/playlist/6573ecf5018c9cbc567f72bf/${id}`
  );
  return res;
};
