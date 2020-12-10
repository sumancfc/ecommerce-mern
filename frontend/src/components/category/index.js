import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../store/actions/categoryAction";
import Title from "../Title";

const CategoryList = ({ title, desc }) => {
  const categories = useSelector((state) => state.categoryList.categories);

  //   console.log(categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className='mb-50'>
      <div className='container'>
        <Title title={title} desc={desc} />
        <div className='row'>{showCategories()}</div>
      </div>
    </div>
  );
};

export default CategoryList;
