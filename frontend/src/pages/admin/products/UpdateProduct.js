import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getProduct, updateProduct } from "../../../helpers/product";
import {
  getAllCategories,
  gCategorySubs,
} from "../../../store/actions/categoryAction";
import AdminProfile from "../AdminProfile";
import ImageUpload from "../common/ImageUpload";
import UpdateProductForm from "../common/UpdateProductForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  subs: [],
  category: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const UpdateProduct = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  //   const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState("");
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();

  const user = useSelector((state) => state.userList);
  const categories = useSelector((state) => state.categoryList.categories);
  const authtoken = user.token;
  const slug = match.params.slug;

  //   console.log(categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    loadProduct();
  }, [dispatch]);

  const loadProduct = () => {
    getProduct(slug)
      .then((prod) => {
        setValues({ ...values, ...prod.data });
        //load single product category subs
        gCategorySubs(prod.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default subs
        });
        let arr = [];
        prod.data.subs.map((s) => {
          arr.push(s._id);
        });
        console.log("ARR", arr);
        setArrayOfSubs((prev) => arr); // required for ant design select to work
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(values);

  //handle create product submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, authtoken)
      .then((res) => {
        setLoading(false);
        addToast(`Product is updated`, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/admin/products");
      })
      .catch((error) => {
        console.log(error.response.data.err);
        addToast(error.response.data.err, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  //handle change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //handle category change
  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    gCategorySubs(e.target.value)
      .then((res) => {
        console.log("SUB OPTIONS ON CATGORY CLICK", res.data);
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err));

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <AdminProfile title='Update Product'>
      {/* Image Upload Btn */}
      <ImageUpload
        setLoading={setLoading}
        values={values}
        setValues={setValues}
      />

      {/* Product Create Form */}
      <UpdateProductForm
        categories={categories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setValues={setValues}
        values={values}
        handleCatagoryChange={handleCatagoryChange}
        subOptions={subOptions}
        arrayOfSubs={arrayOfSubs}
        setArrayOfSubs={setArrayOfSubs}
        selectedCategory={selectedCategory}
      />
    </AdminProfile>
  );
};

export default UpdateProduct;
