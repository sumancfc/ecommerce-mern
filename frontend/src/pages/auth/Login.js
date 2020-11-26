import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  // handle submit for login submit
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;

      const userIdToken = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: user.email, token: userIdToken.token },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  //handle submit for google submit
  const handleGoogleSubmit = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;

        //  console.log(user);

        const userIdToken = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: userIdToken.token },
        });
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
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
