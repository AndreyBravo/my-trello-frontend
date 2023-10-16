import React from "react";

import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../store/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onLogout = ()=>{
    if(window.confirm("Are you want to logout?")){
      dispatch(logout()); 
      localStorage.removeItem('token')
    }

  }
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button variant="outlined">
                  <Link className="link_login" to="/login">
                    add task
                  </Link>
                </Button>
                <Button onClick={onLogout} variant="contained" color="error">
                  <Link className="link_reg" >
                    Logout
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined">
                  <Link className="link_login" to="/login">
                    Go Login
                  </Link>
                </Button>
                <Button variant="outlined">
                  <Link className="link_reg" to="/register">
                    Go register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
