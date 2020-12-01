import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { createProduct } from "../../../helpers/product";
import {
  getAllCategories,
  gCategorySubs,
} from "../../../store/actions/categoryAction";
import AdminProfile from "../AdminDashboard";
import ProductForm from "../common/ProductForm";

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  //   categories: [],
  subs: [],
  category: "",
  shipping: "Yes",
  quantity: "50",
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};

const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState("");
  const [showSub, setShowSub] = useState(false);

  const { addToast } = useToasts();

  const user = useSelector((state) => state.userList);
  const categories = useSelector((state) => state.categoryList.categories);
  const authtoken = user.token;

  //   console.log(categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  //handle create product submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, authtoken)
      .then((res) => {
        setValues(initialState);
        addToast(`Product is created`, {
          appearance: "success",
          autoDismiss: true,
        });
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
    setValues({ ...values, category: e.target.value });

    gCategorySubs(e.target.value)
      .then((res) => {
        console.log("SUB OPTIONS ON CATGORY CLICK", res.data);
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err));
    setShowSub(true);
  };

  return (
    <AdminProfile title='Create Products'>
      <ProductForm
        categories={categories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setValues={setValues}
        values={values}
        handleCatagoryChange={handleCatagoryChange}
        subOptions={subOptions}
        showSub={showSub}
      />
    </AdminProfile>
  );
};

export default CreateProduct;
