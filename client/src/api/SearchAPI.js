import axios from "./axiosConfig";

export const searchLists = async (search) => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/search?search=${search}`
    );
    return res;
}