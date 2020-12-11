import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductBySearch,
  getProductsByCount,
  productSort,
} from "../helpers/product";
import ShopTopbar from "../components/shop/ShopTopBar";
import ShopProducts from "../components/shop/ShopProducts";
import ShopSidebar from "../components/shop/ShopSidebar";
import { SEARCH_QUERY } from "../store/constants";
import { getAllCategories } from "../store/actions/categoryAction";
import { getSubs } from "../store/actions/subAction";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid three-column");
  const [sortType] = useState("");
  const [sortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState("");
  const [colors] = useState(["Black", "Brown", "Silver", "White", "Blue"]);
  const [color, setColor] = useState("");

  const dispatch = useDispatch();

  // search from store
  const search = useSelector((state) => state.search);
  const { text } = search;
  //categories from store
  const categories = useSelector((state) => state.categoryList.categories);

  //load default on page load
  useEffect(() => {
    loadAllProducts();
    dispatch(getAllCategories());

    getSubs().then((res) => setSubs(res.data));
  }, [dispatch]);

  const fetchProducts = (args) => {
    getProductBySearch(args).then((res) => {
      setProducts(res.data);
    });
  };

  //for layout change from grid->list and list->grid
  const getLayout = (layout) => setLayout(layout);

  const filterSort = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  const loadAllProducts = () => {
    getProductsByCount(12).then((res) => setProducts(res.data));
  };

  // console.log(categories);

  //product sort by price default,high,low
  useEffect(() => {
    let sortedProducts = productSort(products, sortType, sortValue);

    const filterSortedProducts = productSort(
      sortedProducts,
      filterSortType,
      filterSortValue
    );

    sortedProducts = filterSortedProducts;

    setSortedProducts(sortedProducts);

    setCurrentData(sortedProducts);
  }, [products, sortType, sortValue, filterSortType, filterSortValue]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts({ query: text });
      // if (!text) {
      //   loadAllProducts();
      // }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  useEffect(() => {
    fetchProducts({ price });
  }, [ok, price]);

  //handle price slider
  const handleSlider = (value) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setCategoryIds([]);
    setPrice(value);
    setSub("");
    setBrand("");
    setShipping("");
    setColor("");

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //handle Category
  const handleCheck = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setSub("");
    setBrand("");
    setShipping("");
    setColor("");

    const inTheState = [...categoryIds];
    const checked = e.target.value;
    const foundInTheState = inTheState.indexOf(checked); // index or -1

    if (foundInTheState === -1) {
      inTheState.push(checked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);

    fetchProducts({ category: inTheState });
  };

  //handle Sub category
  const hanldeSubcategory = (sub) => {
    setSub(sub);

    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setShipping("");
    setColor("");

    fetchProducts({ sub });
  };

  //handle brand
  const handleBrand = (e) => {
    setSub(sub);

    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand(e.target.value);
    setShipping("");
    setColor("");

    fetchProducts({ brand: e.target.value });
  };

  //handle Shipping
  const handleShipping = (e) => {
    setSub("");

    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setShipping(e.target.value);
    setColor("");
    fetchProducts({ shipping: e.target.value });
  };

  //handle Color
  const handleColor = (e) => {
    setSub("");

    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

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
            <div className='col-lg-3'>
              <ShopSidebar
                price={price}
                handleSlider={handleSlider}
                categories={categories}
                handleCheck={handleCheck}
                categoryIds={categoryIds}
                hanldeSubcategory={hanldeSubcategory}
                subs={subs}
                brands={brands}
                brand={brand}
                handleBrand={handleBrand}
                shipping={shipping}
                handleShipping={handleShipping}
                colors={colors}
                color={color}
                handleColor={handleColor}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
