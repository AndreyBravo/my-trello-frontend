import React from "react";

import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "@mui/material/Button"; 
import Container from "@mui/material/Container";


export const Header = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.buttons}>
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
          </div>
        </div>
      </Container>
    </div>
  );
};
