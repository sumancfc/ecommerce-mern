import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  getSingleCategory,
  updateCategory,
} from "../../../store/actions/categoryAction";
import { CATEGORY_UPDATE_RESET } from "../../../store/constants/category";
import AdminProfile from "../AdminDashboard";
import CategoryForm from "../common/CategoryForm";

const UpdateCategory = ({
  user,

  updateCategory,
  categoryUpdate,
  history,
  match,
}) => {
  const [category, setCategory] = useState("");

  const authtoken = user.token;
  const slug = match.params.slug;

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { success } = categoryUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push("/admin/category");
    }

    dispatch(getSingleCategory(slug, setCategory));
  }, [slug, success, dispatch, history]);

  const handleUpdateCategory = (e) => {
    e.preventDefault();

    updateCategory(category, authtoken, slug, setCategory, addToast);
  };

  return (
    <AdminProfile title='Update Category'>
      <div className='account__form'>
        <CategoryForm
          handleCategory={handleUpdateCategory}
          value={category.name}
          setName={setCategory}
          title='Update Category'
        />
      </div>
    </AdminProfile>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
    categorySingle: state.categorySingle,
    categoryUpdate: state.categoryUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCategory: (name, authtoken, slug, setName, addToast) => {
      dispatch(updateCategory(name, authtoken, slug, setName, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategory);
