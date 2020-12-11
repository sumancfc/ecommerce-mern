import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import { useSelector } from "react-redux";
import {
  getProductBySearch,
  getProductsByCount,
  productSort,
} from "../helpers/product";
import ShopTopbar from "../components/shop/ShopTopBar";
import ShopProducts from "../components/shop/ShopProducts";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  // const dispatch = useDispatch();

  const search = useSelector((state) => state.search);
  const { text } = search;

  const getLayout = (layout) => setLayout(layout);

  const getSort = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const filterSort = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    getProductsByCount(8).then((res) => setProducts(res.data));
  }, []);

  const fetchProducts = (args) => {
    getProductBySearch(args).then((res) => {
      setProducts(res.data);
    });
  };

  console.log(currentData);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);

    let sortedProducts = productSort(products, sortType, sortValue);

    const filterSortedProducts = productSort(
      sortedProducts,
      filterSortType,
      filterSortValue
    );

    sortedProducts = filterSortedProducts;

    setSortedProducts(sortedProducts);

    setCurrentData(sortedProducts);

    return () => clearTimeout(delay);
  }, [text, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Layout>
      <Breadcrumb pageTitle='Shop' />

      <div className='shop__area pt-90 pb-90 section-padding'>
        <div className='container-fluid'>
          <div className='row flex-row-reverse'>
            <div className='col-lg-9'>
              <ShopTopbar
                getLayout={getLayout}
                getFilterSort={filterSort}
                productNum={products.length}
                productSortedNum={currentData.length}
              />

              <ShopProducts layout={layout} products={currentData} />
            </div>
            <div className='col-lg-3'></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
