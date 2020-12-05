import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import { PRODUCT_REVIEW_RESET } from "../../store/constants";
import {
  productDetails,
  reviewProduct,
} from "../../store/actions/productAction";
import Rating from "../rating";

const TabPane = Tabs.TabPane;

const SingleProductDesc = ({ slug, user }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { product } = productDetail;

  const productReview = useSelector((state) => state.productReview);
  const { success } = productReview;

  useEffect(() => {
    if (success) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }

    dispatch(productDetails(slug));
  }, [dispatch, slug, success]);

  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      reviewProduct(
        product._id,
        {
          rating,
          comment,
        },
        user.token
      )
    );
  };

  return (
    <div className='description__wrapper pb-90'>
      <div className='container'>
        <div className='row'>
          <div className='ml-auto mr-auto col-lg-10'>
            <div className='desc__review-topbar  mb-40'>
              <Tabs defaultActiveKey='1'>
                <TabPane tab='Description' key='1'>
                  <p>{product.description}</p>
                </TabPane>
                <TabPane tab='Reviews' key='2'>
                  {product.reviews.length === 0 && <h2>No Reviews</h2>}
                  <ListGroup variant='flush'>
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <Rating value={review.rating} />
                        <strong>{review.name}</strong>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                      {user && (
                        <Form onSubmit={reviewHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                            ></Form.Control>
                          </Form.Group>
                          <Button type='submit' variant='primary'>
                            Submit
                          </Button>
                        </Form>
                      )}
                      {!user && (
                        <div>
                          Please <Link to='/login'>sign in</Link> to write a
                          review
                        </div>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
  };
};

export default connect(mapStateToProps)(SingleProductDesc);
