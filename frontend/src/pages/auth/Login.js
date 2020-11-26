import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";
import { loginUser, loginUsingGoogle } from "../../store/actions/userAction";

const Login = ({ history, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  // handle submit for login
  const handleForm = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password, history, addToast));
  };

  //handle submit for google
  const handleGoogleSubmit = () => {
    dispatch(loginUsingGoogle(history, addToast));
  };

  return (
    <Layout>
      <Breadcrumb pageTitle='Login' />

      <div className='login__register-area pt-85 pb-90'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-7 col-md-12 ml-auto mr-auto'>
              <div className='login__register-wrapper'>
                <div className='login__form-wrapper'>
                  <div className='login__register-form'>
                    <form onSubmit={handleForm}>
                      <input
                        name='email'
                        placeholder='Email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                      <input
                        name='password'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className='login__toggle-btn clearfix'>
                        <Link to='/forgot/password'>Forgot Password?</Link>
                      </div>
                      <div className='button__box'>
                        {/* Login btn */}
                        <button
                          type='submit'
                          disabled={!email || password.length < 6}
                        >
                          Login
                        </button>
                        {/* Google btn */}
                        <button
                          type='submit'
                          className='ml-40'
                          onClick={handleGoogleSubmit}
                        >
                          Login with Google
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
  };
};

export default connect(mapStateToProps)(Login);
