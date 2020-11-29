import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Search from "../../../components/search";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../store/actions/categoryAction";
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_RESET,
} from "../../../store/constants/category";

const Category = ({
  user,
  category,
  getAllCategories,
  createCategory,
  categoryCreate,
  deleteCategory,
  categoryDelete,
}) => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const authtoken = user.token;
  const { success } = categoryCreate;
  const { success: deleteSuccess } = categoryDelete;

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
    if (deleteSuccess) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    getAllCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, deleteSuccess]);

  const handleCategory = (e) => {
    e.preventDefault();

    createCategory(name, authtoken, addToast, setName);
  };

  const removeCategory = (slug) => {
    deleteCategory(slug, authtoken, addToast);
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <div className='account__form'>
        <form onSubmit={handleCategory}>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='input__item'>
                <input
                  type='text'
                  name='category'
                  placeholder='Enter category name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className='input__item'>
            <button className='btn-check'>Create Category</button>
          </div>
        </form>
        <hr />
        <Search keyword={keyword} setKeyword={setKeyword} />
        <div className='row mt-25'>
          {category.categories.filter(searched(keyword)).map((c) => (
            <div
              key={c._id}
              className='d-flex justify-content-between align-items-center category__box bg-gray'
            >
              {c.name}
              <div className='category__icon'>
                <span className='' onClick={() => removeCategory(c.slug)}>
                  <i className='fa fa-close' />
                </span>
                <span>
                  <i className='fa fa-edit' />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
    category: state.categoryList,
    categoryCreate: state.categoryCreate,
    categoryDelete: state.categoryDelete,
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
