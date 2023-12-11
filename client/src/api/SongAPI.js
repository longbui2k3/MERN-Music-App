import axios from "axios";

const SongAPI = {
  getAllSong() {
    const url = "http://localhost:4000/api/v1/songs";

    return axios.get(url);
  },
};

export default SongAPI;
