import axios from "axios";

const SectionAPI = {
  getAllSection() {
    const url = "http://localhost:4000/api/v1/sections";

    return axios.get(url);
  },
};

export default SectionAPI;
