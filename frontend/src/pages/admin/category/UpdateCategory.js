import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  getSingleCategory,
  updateCategory,
} from "../../../store/actions/categoryAction";
import {
  CATEGORY_SINGLE_RESET,
  CATEGORY_UPDATE_RESET,
} from "../../../store/constants/category";
import AdminProfile from "../AdminDashboard";
import CategoryForm from "../common/CategoryForm";

const UpdateCategory = ({
  user,
  categorySingle,
  getSingleCategory,
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
  const { success: updateSuccess } = getSingleCategory;

  useEffect(() => {
    if (success) {
      //       setCategory(categorySingle.name);
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push("/admin/category");
    }

    if (updateSuccess) {
      dispatch({ type: CATEGORY_SINGLE_RESET });
    }
    loadCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, success, updateSuccess]);

  const loadCategory = () => {
    getSingleCategory(slug, setCategory);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    // setName()

    updateCategory(category, authtoken, slug, setCategory, addToast);
  };

  return (
    <AdminProfile title='Update Category'>
      <div className='account__form'>
        <CategoryForm
          handleCategory={handleUpdateCategory}
          value={category}
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
    getSingleCategory: (slug, setCategory) => {
      dispatch(getSingleCategory(slug, setCategory));
    },
    updateCategory: (name, authtoken, slug, setName, addToast) => {
      dispatch(updateCategory(name, authtoken, slug, setName, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategory);
