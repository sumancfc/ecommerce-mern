import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useToasts } from "react-toast-notifications";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToasts();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegister"));
    //     console.log(window.localStorage.getItem("emailForRegister", email));
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      addToast("Email and password required", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }

    if (password.length < 6) {
      addToast("Password must be atleast 6 character long", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //       console.log(result);
      if (result.user.emailVerified) {
        //remove email from local storage
        window.localStorage.removeItem("emailForRegister", email);

        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);

        const userIdToken = await user.getIdTokenResult();

        //  console.log("user", user, "Token Id", userTokenId);

        //redirect user
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      addToast(error.message, {
        autoDismiss: true,
        appearance: "error",
      });
    }
  };
  return (
    <Layout>
      <Breadcrumb pageTitle='Register' />

      <div className='login__register-area pt-85 pb-90'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-7 col-md-12 ml-auto mr-auto'>
              <div className='login__register-wrapper'>
                <div className='login__register-tab-list nav'>
                  <h4> Register </h4>
                </div>

                <div className='login__form-wrapper'>
                  <div className='login__register-form'>
                    <form onSubmit={handleForm}>
                      <input
                        name='email'
                        placeholder='Email'
                        type='email'
                        value={email}
                        disabled
                      />
                      <input
                        name='password'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus
                      />
                      <div className='button__box'>
                        <button type='submit'>Complete Register</button>
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

export default RegisterComplete;
