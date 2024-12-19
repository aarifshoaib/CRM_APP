import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { authRoutes, publicRoutes } from "./router.link";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Login from "../auth/login";
import { useSelector } from "react-redux";

const ALLRoutes: React.FC = () => {
    const location = useLocation();

    // Find the current route in either public or auth routes
    const currentRoute = publicRoutes.find(route => route.path === location.pathname) ||
        authRoutes.find(route => route.path === location.pathname);

    // Construct the full title
    const fullTitle = currentRoute?.title
        ? `${currentRoute.title} | CRMS - Advanced Bootstrap 5 Admin Template for Customer Management`
        : "CRMS - Advanced Bootstrap 5 Admin Template for Customer Management";

    useEffect(() => {
        document.title = fullTitle;
    }, [fullTitle]);

    const isLoggedIn = useSelector((state: any) => state.entities?.auth?.list.items) || { "status": 0 };
    let isAuth = false;
    isAuth = (isLoggedIn.status === 200) ? true : false;

    return (
        <>
            <Helmet>
                <title>{fullTitle}</title>
            </Helmet>
            <Routes>
                {!isAuth && <Route path="/" element={<Login />} />}

                <Route element={<Feature />}>
                    {publicRoutes.map((route, idx) => (
                        <Route path={route.path} element={route.element} key={idx} />
                    ))}
                </Route>
                <Route element={<AuthFeature />}>
                    {authRoutes.map((route, idx) => (
                        <Route path={route.path} element={route.element} key={idx} />
                    ))}
                </Route>
            </Routes>
        </>
    );
};

export default ALLRoutes;
