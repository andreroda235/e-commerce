import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

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
import { API_GetUserCart } from "./shared/util/request-api";

const App = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.isLoggedIn){
      /* if(auth.remember){ */
        const request = API_GetUserCart(auth.userId, auth.token);
        sendRequest(request).then(response => {
          console.log(response.data.items);
          const data = response.data;
          if(data.auth === false){
            dispatch(logout());
            return;
          } else
            dispatch(login(auth.token, auth.userId));
          if (data.items.length > 0){
            dispatch(loadCart(data.items));
          } else 
            dispatch(resetCart());
        });
      /* }; */
    }
  }, [auth.isLoggedIn]);

  const publicRoutes = (
    <>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="/shopping/:category/:subcategory" exact element={<ShoppingPage/>}/>
      <Route path="/shopping/item-detail/:itemId" exact element={<ItemDetailPage/>}/>
      <Route path="/shopping/cart-review" exact element={<CartReviewPage/>}/>
      <Route path="/shopping/"/>
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
  
  if(auth.admin && auth.isLoggedIn)
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