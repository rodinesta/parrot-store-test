import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from "../pages/HomePage";
import SellerPage from "../pages/SellerPage";
import ProductPage from "../pages/ProductPage";
import Auth from "../pages/Auth";
import Error from "../pages/Error";
import {ERROR_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SELLER_ROUTE} from "../utils/consts";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={HOME_ROUTE} element={<HomePage/>}/>
            <Route path={LOGIN_ROUTE} element={<Auth/>}/>
            <Route path={REGISTRATION_ROUTE} element={<Auth/>}/>
            <Route path={PRODUCT_ROUTE} element={<ProductPage/>}/>
            <Route path={SELLER_ROUTE} element={<SellerPage/>}/>
            <Route path={ERROR_ROUTE} element={<Error/>}/>
            <Route path="*" element={<Navigate to="/error" replace/>}/>
         </Routes>
    );
};

export default AppRouter;