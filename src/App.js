import React from "react";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import SignIn from "./Components/Register/SignIn";
import Favorites from "./Components/Home/Favorites";
import NewDiary from "./Components/Home/NewDiary";
import Private from "./Components/Header/Private";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/favorites"
          element={
            <Private>
              <Favorites />
            </Private>
          }
        />
        <Route
          path="/newdiary"
          element={
            <Private>
              <NewDiary />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
