import axios from "./axiosConfig";

export const getUser = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/user/me`);
  return res;
};

export const addFavoriteListsong = async (listSong) => {
  const res = await axios.post("http://localhost:4000/api/v1/user/favorite", {
    listSong,
  });

  return res;
};

export const removeFavoriteListsong = async (listSong) => {
  const res = await axios.delete(`http://localhost:4000/api/v1/user/favorite/${listSong}`);

  return res;
};
