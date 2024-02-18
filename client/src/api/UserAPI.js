import axios from "./axiosConfig";

export const getUser = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/user/me`);
  return res;
};

export const addFavoriteMusicList = async (musicList) => {
  const res = await axios.post("http://localhost:4000/api/v1/user/favorite", {
    musicList,
  });

  return res;
};

export const removeFavoriteMusicList = async (musicList) => {
  const res = await axios.delete(
    `http://localhost:4000/api/v1/user/favorite/${musicList}`
  );

  return res;
};

export const getMusicListsByUserId = async ({ musiclist_type = "", search = "" }) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/user/musiclists?musiclist_type=${musiclist_type}&search=${search}`
  );
  return res;
};
