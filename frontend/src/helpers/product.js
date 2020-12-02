import axios from "axios";

//create product
export const createProduct = async (product, authtoken) => {
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

//get all products
export const getProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products`);
};

//get single product
export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

//update product
export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

//delete product
export const deleteProduct = async (slug, authtoken) => {
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

// get All products
export const getAllProducts = (products, limit, type) => {
  const finalProducts = products;

  //product by arrival
  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.createdAt);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }

  //product by best sells
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.quantity - a.quantity;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }

  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product by sort
export const getSortedProducts = async (sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });
};