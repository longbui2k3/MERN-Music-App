import axios from "./axiosConfig"


export const getUser = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/v1/user/${id}`);
    return res;
}