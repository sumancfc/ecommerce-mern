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

//get products by count
export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
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

// get All products based on sort
export const getAllProducts = (products, type, limit) => {
  const finalProducts = products;

  // console.log(finalProducts);

  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.sold - a.sold;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }

  //product by arrival
  if (type && type === "bestPrice") {
    return finalProducts
      .slice()
      .sort((a, b) => b.price - a.price)
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

//get related product
export const getRelatedProduct = async (productId) => {
  return axios.get(`${process.env.REACT_APP_API}/product/${productId}/related`);
};

//get related product
export const getProductBySearch = async (args) => {
  return axios.post(`${process.env.REACT_APP_API}/search/filters`, args);
};

//Change the layout as grid / list
export const setActiveLayout = (e) => {
  const switchBtn = document.querySelectorAll(".view__mode a");
  switchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

//product sort
export const productSort = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    //sort by price high --> low to low --> high
    if (sortType === "filterSort") {
      let sortedProduct = [...products];

      if (sortValue === "default") {
        return sortedProduct;
      }

      if (sortValue === "priceHighToLow") {
        return sortedProduct.sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sortValue === "priceLowToHigh") {
        return sortedProduct.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }

  return products;
};
