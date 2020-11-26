import React, { useState } from "react";
import { auth } from "../../firebase";
import { useToasts } from "react-toast-notifications";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";

const Register = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useToasts();

  const handleForm = async (e) => {
    e.preventDefault();

    const config = {
      url: "http://localhost:3000/register/complete",
      // This must be true.
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    addToast(`Email sent to ${email}`, {
      appearance: "success",
      autoDismiss: true,
    });

    window.localStorage.setItem("emailForRegister", email);

    //clear email
    setEmail("");
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

export default Register;
