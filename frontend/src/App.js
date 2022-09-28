import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import HomePage from "./pages/HomePage";

const App = () => {


  let routes = (
    <>
      <Route path="/" exact element={<HomePage/>}/>
    </>
  );

  return (
    <BrowserRouter>
      <MainNavigation/>
      <main>
        <Routes>
          {routes}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;