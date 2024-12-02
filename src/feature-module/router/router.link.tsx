import { all_routes } from "./all_routes";
import { Navigate, Route } from "react-router";
import Login from "../auth/login";
import CompaniesWrapper from "../crm/companies/companies";
import CompaniesDetails from "../crm/companies/companiesDetails";
import CompaniesGrid from "../crm/companies/companiesGrid";

const route = all_routes

export const publicRoutes = [
    {
        path: route.companies,
        element: <CompaniesWrapper />,
        route: Route,
        title: 'Companies'
    },
    {
        path: route.companyDetails,
        element: <CompaniesDetails />,
        route: Route,
        title: 'Company Details'
    },
    {
        path: route.companiesGrid,
        element: <CompaniesGrid />,
        route: Route,
        title: 'Companies Grid'
    },
];


export const authRoutes = [

    {
        path: route.login,
        element: <Login />,
        route: Route,
        title: 'Login'
    }

];
