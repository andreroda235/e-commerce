import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { CONTENT_TYPE_JSON, GET_USER_CART } from "./shared/util/request-config";
import { useHttpClient } from "./shared/hooks/http-hook";
import { loadCart, resetCart } from "./redux/cart-slice";
import { login, logout } from "./redux/auth-slice";

import { FlyoutHook } from "./shared/components/Navigation/AccountMenu/AccountFlyout";
import { BackdropHook } from "./shared/components/UIElements/Backdrop2";
import MainNavigation from './shared/components/Navigation/MainNavigation';
import HomePage from "./pages/HomePage";
import ShoppingPage from "./pages/ShoppingPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import Content from "./pages/Content";
import CartReviewPage from "./pages/CartReviewPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import AdminItemPage from "./pages/AdminItemPage";

const App = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!auth.isLoggedIn){
      if(auth.remember){
        const header = {
          ...CONTENT_TYPE_JSON,
          Authorization: `Bearer ${auth.token}`
        };
        const data = {userId: auth.userId};
        const request = {
            ...GET_USER_CART(auth.userId),
            ...header,
            data
        };
        sendRequest(request).then(response => {
          const data = response.data;
          if(data.auth === false){
            dispatch(logout());
            return;
          } else
            dispatch(login(auth.token, auth.userId));
          if (data.cart.items.length > 0){
            const cartData = {
              items         : data.cart.items,
              totalQuantity : data.cart.totalQuantity,
              totalPrice    : data.cart.totalPrice
            };
            dispatch(loadCart(cartData));
          } else 
            dispatch(resetCart());
        });
      };
    }
  });

  const publicRoutes = (
    <>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="/shopping/:category/:subcategory" exact element={<ShoppingPage/>}/>
      <Route path="/shopping/item-detail/:itemId" exact element={<ItemDetailPage/>}/>
      <Route path="/shopping/cart-review" exact element={<CartReviewPage/>}/>
    </>
  );

  const signupRoute = <Route path="/auth" exact element={<AuthenticationPage/>}/>;

  const adminRoutes = (
    <>
      <Route path="/admin/*" exact element={<AdminItemPage/>}/>
    </>
  );

  let routes = publicRoutes;

  console.log('isLoggedIn ' + auth.isLoggedIn);

  if(!auth.isLoggedIn)
    routes = (
      <>
        {routes}
        {signupRoute}
      </>
    );
  
  if(auth.admin)
      routes = (
        <>
          {routes}
          {adminRoutes}
        </>
      );


  return isLoading ? 
    <LoadingSpinner/> :
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
  ;
}

export default App;