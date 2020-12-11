import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import SearchCategory from "../../../components/search/SearchCategory";
import { getAllCategories } from "../../../store/actions/categoryAction";
import {
  createSubCategory,
  getSubs,
  removeSub,
} from "../../../store/actions/subAction";
import AdminProfile from "../AdminDashboard";
import CategoryForm from "../common/CategoryForm";
import ListTable from "../common/ListTable";

const CreateSubCategory = ({ user, categories, getAllCategories }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState("");

  const authtoken = user.token;

  const { addToast } = useToasts();

  useEffect(() => {
    getAllCategories();
    loadSubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSubs = () => {
    getSubs().then((s) => setSubs(s.data));
  };

  const handleCreateSubCategory = (e) => {
    e.preventDefault();

    createSubCategory({ name, parent: category }, authtoken)
      .then((res) => {
        setName("");
        setCategory("");
        addToast(`"${res.data.name}" is created`, {
          appearance: "success",
          autoDismiss: true,
        });
        loadSubs();
      })
      .catch((error) => {
        //  console.log(error.response.data.message);
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const removeSubCategory = async (slug) => {
    removeSub(slug, authtoken)
      .then((res) => {
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        loadSubs();
      })
      .catch((error) => {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <AdminProfile title='Sub Category'>
      <div className='form-group'>
        <label>Parent category</label>
        <select
          name='category'
          className='form-control'
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className='account__form'>
        <CategoryForm
          handleCategory={handleCreateSubCategory}
          value={name}
          setName={setName}
          title='Create Sub Category'
          placeholder='Enter Sub Category'
        />

        <hr />
        <SearchCategory keyword={keyword} setKeyword={setKeyword} />
        <div className='row mt-25'>
          {subs.filter(searched(keyword)).map((subc) => (
            <ListTable
              key={subc._id}
              c={subc}
              removeCategory={removeSubCategory}
              link='subcategory'
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => {
      dispatch(getAllCategories());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubCategory);
