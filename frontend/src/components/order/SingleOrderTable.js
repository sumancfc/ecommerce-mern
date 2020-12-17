import React from "react";

const SingleOrderTable = ({ products }) => {
  return (
    <div className='mt-40'>
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>S.N</th>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Brand</th>
            <th scope='col'>Color</th>
            <th scope='col'>Count</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SingleOrderTable;
