import axios from "./axiosConfig";

export const getChildOfFolder = async (parentId) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/folder/childs?parentId=${parentId}`
  );
  return res;
};

export const createFolder = async (parentId) => {
  const res = await axios.post(`http://localhost:4000/api/v1/folder`, {
    parentId,
  });
  return res;
};
