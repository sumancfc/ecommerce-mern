import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";
import { loginUser, loginUsingGoogle } from "../../store/actions/userAction";

const Login = ({ history }) => {
  const [email, setEmail] = useState("sumanstha999@gmail.com");
  const [password, setPassword] = useState("sumancfc");
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userList);

  useEffect(() => {
    let int = history.location.state;

    if (int) {
      return;
    } else {
      if (user && user.token) {
        history.push("/admin/dashboard");
      }
    }
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

export default Login;
