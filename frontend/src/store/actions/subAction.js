import axios from "axios";

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subcategories`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/subcategory/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSubCategory = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/subcategory`, sub, {
    headers: {
      authtoken,
    },
  });
