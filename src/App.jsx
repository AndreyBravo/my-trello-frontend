import React, { useEffect } from "react";

import { Header } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetMe, selectIsAuth } from "./store/auth";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Home } from "./pages";

function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetMe());
  }, []);

  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <Home />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
