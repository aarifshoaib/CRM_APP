import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../../../core/utils/axios.interceptor";

export const companiesContext = createContext({
    saveCompany: (payload: any) => { },
    deleteCompany: (id: number) => { },
    updateCompany: (id: number) => { },
    getCompanyDetails: (id: number) => { },
    errors: {},
    setErrors: (errors: any) => { },
    list: []
});

function CompanyContextProvider({ children }: any) {
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({});
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        getCompanies();
    }, []);

    const saveCompany = async (company: any) => {
        try {
            const response = await axiosInstance.post('/companies', company);
            return response;
        } catch (error) {
            return error;
        }
    }

    const deleteCompany = (id: number) => {
    }

    const updateCompany = (id: number) => {
    }

    const getCompanies = async () => {
        try {
            const response = await axiosInstance.get('/companies');
            const data = response.data;
            setList(data);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const getCompanyDetails = (id: number) => {

    }


    const value = {
        saveCompany,
        deleteCompany,
        updateCompany,
        getCompanyDetails,
        list,
        errors,
        setErrors,
    }

    return (
        <companiesContext.Provider value={value}>
            {children}
        </companiesContext.Provider>
    )

}

export default CompanyContextProvider;