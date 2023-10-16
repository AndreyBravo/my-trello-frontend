import React, { useEffect } from "react";

import { Header } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetMe,selectIsAuth } from "./store/auth";

function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetMe());
  }, []);
  return (
    <>
      <Header />
    </>
  );
}

export default App;
