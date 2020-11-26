import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";
import { passportReset } from "../../store/actions/userAction";

const ForgotPassword = ({ history, user }) => {
  const [email, setEmail] = useState("");
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  //handle password reset form
  const handleForm = (e) => {
    e.preventDefault();

    dispatch(passportReset(email, setEmail, addToast));
  };

  return (
    <Layout>
      <Breadcrumb pageTitle='Forgot Password' />

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
                        placeholder='Email your email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className='button__box'>
                        <button type='submit'>Forgot Password</button>
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

export default connect(mapStateToProps)(ForgotPassword);
