import React from "react";

import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../store/auth";
import { useAddTaskMutation } from "../../api/tasks.api";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [addTask] = useAddTaskMutation();

  const onLogout = () => {
    if (window.confirm("Are you want to logout?")) {
      dispatch(logout());
      localStorage.removeItem("token");
    }
  };

  const formData = {
    status: "open",
    title: "topic",
    content: "asffafasa",
    employer: "Loi",
    employee: "Steffani",
    grade: "5",
    deadLine: "2022-10-12",
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button variant="outlined">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      addTask(formData);
                    }}
                    className="link_login"
                    to="/login"
                  >
                    Add task
                  </Link>
                </Button>
                <Button onClick={onLogout} variant="contained" color="error">
                  <Link className="link_reg">Logout</Link>
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
