import axios from "./axiosConfig";

const SongAPI = {
  async getAllSong() {
    const url = "http://localhost:4000/api/v1/songs";

    return await axios.get(url);
  },
};

export const getSong = async (id) => {
  const res = await axios.get(`localhost:4000/api/v1/songs/${id}`);
  return res;
};

export default SongAPI;
