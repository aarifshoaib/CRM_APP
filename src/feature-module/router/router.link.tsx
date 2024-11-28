import Companies from "../crm/companies/companies";
import { all_routes } from "./all_routes";
import { Navigate, Route } from "react-router";
import Login from "../crm/auth/login";

const route = all_routes

export const publicRoutes = [
    {
        path: route.companies,
        element: <Companies />,
        route: Route,
        title: 'Companies'
    }];


export const authRoutes = [

    {
        path: route.login,
        element: <Login />,
        route: Route,
        title: 'Login'
    }
   
];
