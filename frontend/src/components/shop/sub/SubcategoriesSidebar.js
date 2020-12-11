import React from "react";

const SubcategoriesSidebar = ({ subs, hanldeSubcategory }) => {
  return (
    <>
      {subs.map((sub) => (
        <div
          key={sub._id}
          onClick={() => hanldeSubcategory(sub)}
          className='p-1 m-1 badge badge-secondary'
          style={{ cursor: "pointer" }}
        >
          {sub.name}
        </div>
      ))}
    </>
  );
};

export default SubcategoriesSidebar;
