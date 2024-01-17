import axios from "./axiosConfig";

const SingerAPI = {
  getSingerById(id) {
    const url = `http://localhost:4000/api/v1/singer/${id}`;

    return axios.get(url);
  },
};

export default SingerAPI;
