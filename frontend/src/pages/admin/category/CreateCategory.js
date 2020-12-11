import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import SearchCategory from "../../../components/search/SearchCategory";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../store/actions/categoryAction";
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_RESET,
  CATEGORY_UPDATE_RESET,
} from "../../../store/constants/category";
import AdminProfile from "../AdminDashboard";
import CategoryForm from "../common/CategoryForm";
import ListTable from "../common/ListTable";

const CreateCategory = ({
  user,
  categories,
  getAllCategories,
  createCategory,
  categoryCreate,
  deleteCategory,
  categoryDelete,
  categoryUpdate,
}) => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const authtoken = user.token;
  const { success } = categoryCreate;
  const { success: deleteSuccess } = categoryDelete;
  const { success: updateSuccess } = categoryUpdate;

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
    if (deleteSuccess) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }

    if (updateSuccess) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
    }
    getAllCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, deleteSuccess, updateSuccess]);

  const handleCreateCategory = (e) => {
    e.preventDefault();

    createCategory(name, authtoken, addToast, setName);
  };

  const removeCategory = (slug) => {
    deleteCategory(slug, authtoken, addToast);
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <AdminProfile title='Category'>
      <div className='account__form'>
        <CategoryForm
          handleCategory={handleCreateCategory}
          value={name}
          setName={setName}
          title='Create Category'
          placeholder='Enter Category'
        />

        <hr />
        <SearchCategory keyword={keyword} setKeyword={setKeyword} />
        <div className='row mt-25'>
          {categories.filter(searched(keyword)).map((category) => (
            <ListTable
              key={category._id}
              c={category}
              removeCategory={removeCategory}
              link='category'
            />
          ))}
        </div>
      </div>
    </AdminProfile>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
    categories: state.categoryList.categories,
    categoryCreate: state.categoryCreate,
    categoryDelete: state.categoryDelete,
    categoryUpdate: state.categoryUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (name, authtoken, addToast, setName) => {
      dispatch(createCategory(name, authtoken, addToast, setName));
    },
    getAllCategories: () => {
      dispatch(getAllCategories());
    },
    deleteCategory: (slug, authtoken, addToast) => {
      dispatch(deleteCategory(slug, authtoken, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);
