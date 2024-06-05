import axios from "./axiosConfig";

export const searchLists = async (search) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/search?search=${search}`
  );
  return res;
};

export const searchSongs = async (search) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/search/songs?search=${search}`
  );
  return res;
};

export const searchSingers = async (search) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/search/singers?search=${search}`
  );
  return res;
};

export const searchAlbums = async (search) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/search/albums?search=${search}`
  );
  return res;
};

export const searchPlaylists = async (search) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/search/playlists?search=${search}`
  );
  return res;
};
