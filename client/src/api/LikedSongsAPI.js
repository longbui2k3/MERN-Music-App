import axios from "./axiosConfig";

export const getLikedSongsByUser = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/likedsongs/user`);
  return res;
};

export const addSongToLikedSongs = async (song) => {
  const res = await axios.post(
    `http://localhost:4000/api/v1/likedsongs/songs`,
    { song }
  );

  return res;
};

export const removeSongFromLikedSongs = async (song) => {
  const res = await axios.delete(
    `http://localhost:4000/api/v1/likedsongs/songs/${song}`
  );

  return res;
};
