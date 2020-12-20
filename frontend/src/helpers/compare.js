import axios from "axios";

export const addToCompare = async (productId, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/compare`,
    { productId },
    {
      headers: { authtoken },
    }
  );
};

export const getAllCompare = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/compare`, {
    headers: { authtoken },
  });
};

export const deleteFromCompare = async (productId, authtoken) => {
  return axios.put(
    `${process.env.REACT_APP_API}/user/compare/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );
};
