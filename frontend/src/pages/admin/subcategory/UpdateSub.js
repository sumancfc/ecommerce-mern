import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getAllCategories } from "../../../store/actions/categoryAction";
import { getSub, updateSub } from "../../../store/actions/subAction";
import AdminProfile from "../AdminDashboard";
import CategoryForm from "../common/CategoryForm";

const UpdateSubCategory = ({
  user,
  categories,
  getAllCategories,
  match,
  history,
}) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  //   console.log(parentCat);
  const authtoken = user.token;

  const { addToast } = useToasts();

  const slug = match.params.slug;

  useEffect(() => {
    getAllCategories();
    loadSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSub = () => {
    getSub(slug).then((s) => {
      console.log(s);
      setName(s.data.name);
      setParent(s.data.parent);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateSub(slug, { name, parent }, authtoken)
      .then((res) => {
        setName("");
        addToast(`"${res.data.name}" is updated`, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/admin/subcategory");
      })
      .catch((error) => {
        //  console.log(error.response.data.message);
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <AdminProfile title='Update Sub Category'>
      <div className='form-group'>
        <label>Parent category</label>
        <select
          name='category'
          className='form-control'
          onChange={(e) => setParent(e.target.value)}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id} selected={c._id === parent}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className='account__form'>
        <CategoryForm
          handleCategory={handleSubmit}
          value={name}
          setName={setName}
          title='Update Sub Category'
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSubCategory);
