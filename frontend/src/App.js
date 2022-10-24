import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FlyoutHook } from "./shared/components/Navigation/AccountMenu/AccountFlyout";
import { BackdropHook } from "./shared/components/UIElements/Backdrop2";

import MainNavigation from './shared/components/Navigation/MainNavigation';
import HomePage from "./pages/HomePage";
import ShoppingPage from "./pages/ShoppingPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import Content from "./pages/Content";
import CartReviewPage from "./pages/CartReviewPage";

const App = () => {


  let routes = (
    <>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="/shopping/:category/:subcategory" exact element={<ShoppingPage/>}/>
      <Route path="/shopping/item-detail/:itemId" exact element={<ItemDetailPage/>}/>
      <Route path="/shopping/cart-review" exact element={<CartReviewPage/>}/>
    </>
  );

  return (
    <BrowserRouter>
      <MainNavigation/>
      <main>
        <Content>
          <BackdropHook/>
          <FlyoutHook/>
          <Routes>
              {routes}
          </Routes>
        </Content>
      </main>
    </BrowserRouter>
  );
}

export default App;