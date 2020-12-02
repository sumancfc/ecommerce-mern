import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/userAction";

const Topbar = ({ clsName, user, logout }) => {
  const history = useHistory();
  const { addToast } = useToasts();

  return (
    <div className={`header__area-top pt-15 pb-15 ${clsName}`}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='header__top-left'>
              <Link to='/admin/dashboard' style={{ color: "#fff" }}>
                Admin
              </Link>
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='header__top-right'>
              <div className='top__content-left'>
                <Link className='currency__dropdown-active' to='#'>
                  NRP <i className='fa fa-angle-down'></i>
                </Link>
                <div className='currency__dropdown'>
                  <ul>
                    <li>
                      <Link to='#'>NRP</Link>
                    </li>
                    <li>
                      <Link to='#'>Euro</Link>
                    </li>
                    <li>
                      <Link to='#'>INR</Link>
                    </li>
                    <li>
                      <Link to='#'>USD</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='top__content-right'>
                <Link to='/compare'>Compare</Link>
                <Link to='/wishlist'>Wishlist</Link>
                {!user && <Link to='/login'>Login</Link>}
                {user && (
                  <Link to='#' onClick={() => logout(addToast, history)}>
                    Logout
                  </Link>
                )}
              </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (addToast, history) => {
      dispatch(logout(addToast, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
