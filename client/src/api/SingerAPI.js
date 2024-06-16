import axios from "./axiosConfig";

const SingerAPI = {
  getSingerById(id) {
    const url = `http://localhost:4000/api/v1/singer/${id}`;

    return axios.get(url);
  },
  async getSingerByUser() {
    const url = "http://localhost:4000/api/v1/singer/songs/all";
    return await axios.get(url);
  },
  async searchSinger(search = "") {
    const url = `http://localhost:4000/api/v1/singer?search=${search}`;
    return await axios.get(url);
  },
  async getAlbumBySinger(id) {
    const url = `http://localhost:4000/api/v1/singer/${id}/album`;

    return axios.get(url);
  }
};

export default SingerAPI;
