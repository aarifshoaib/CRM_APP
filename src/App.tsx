import React, { useEffect, useState } from "react";
import { Loader } from "react-feather";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./core/data/redux/store";
import { base_path } from "./environment";
import ALLRoutes from "./feature-module/router/router";
import { setUpAxiosInterceptors } from "./core/utils/axios.interceptor";


const App = () => {
    const [logout, setlogout] = useState(false);
    useEffect(() => {
        setUpAxiosInterceptors(logout);
    }, []);

    return (
        <Provider store={store}>
            <HelmetProvider>
                <BrowserRouter basename={base_path}>
                    <Loader />
                    <ALLRoutes />
                </BrowserRouter>
            </HelmetProvider>
        </Provider>
    );
}

export default App;