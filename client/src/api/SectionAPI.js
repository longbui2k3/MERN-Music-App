import axios from "./axiosConfig";

const SectionAPI = {
  getAllSection() {
    const url = "http://localhost:4000/api/v1/section";

    return axios.get(url);
  },

  getSectionById(id) {
    const url = `http://localhost:4000/api/v1/section/${id}`;

    return axios.get(url);
  },
  async updateSection(id, { title }) {
    const url = `http://localhost:4000/api/v1/section/${id}`;
    return axios.patch(url, { title });
  },
  async addMusiclistToLists({ musiclist, section }) {
    const url = `http://localhost:4000/api/v1/section/musiclist`;
    return await axios.post(url, { musiclist, section });
  },
  async addSingerToLists({ singer, section }) {
    const url = `http://localhost:4000/api/v1/section/singer`;
    return await axios.post(url, { singer, section });
  },
};

export default SectionAPI;
