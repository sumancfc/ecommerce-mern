import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { connect, useDispatch } from "react-redux";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";
import { userRegister } from "../../store/actions/userAction";

const Register = ({ user, history }) => {
  const [email, setEmail] = useState("");
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(userRegister(email, setEmail, addToast));
  };
  return (
    <Layout>
      <Breadcrumb pageTitle='Register' />

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
                        autoFocus
                      />
                      <div className='button__box'>
                        <button type='submit'>Register</button>
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

export default connect(mapStateToProps)(Register);
