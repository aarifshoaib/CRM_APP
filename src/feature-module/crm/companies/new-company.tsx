import Select from "react-select"//Imports the Select component from the react-select library, which provides a customizable dropdown/select component
import { Link } from "react-router-dom"//Imports the Link component from react-router-dom, used to navigate between different routes in a React application without reloading the page
import { useContext, useState } from "react";//Imports useContext (for accessing context values) and useState (for state management) from React
import { formFields, address, social } from "./data";//Imports predefined form field configurations (formFields, address, social) from a local data file
import DynamicForm from "../../../core/common/dynamicForm/dynamicForm";//Imports the DynamicForm component, which dynamically renders form fields based on the provided configuration
import { generateValidationSchema } from "../../../core/common/dynamicForm/validations";//Imports a function to generate a validation schema for the form using libraries like Yup or custom logic
import { FormValidation } from "../../../core/common/dynamicForm/form.validation";//Imports a utility for handling and formatting validation errors
import {companiesContext} from "./context/companies.context";//Imports a context (companiesContext) that provides shared functionality (e.g., saving companies) across components

const NewCompany = () => {//Declares the NewCompany functional component///form: State to store form data.
    //setForm: Function to update the form state.
    //The initial state is an empty object with default keys for each form field.
const [form, setForm] = useState({ name: '', email: '', phone1: '', phone2: '', fax: '', website: '', ratings: '', owner: '', tags: '', deals: '', source: '', industry: '', contacts: '', currency: '', language: '', description: '', address: '', city: '', state: '', country: '', zip: '', facebook: '', twitter: '', linkedin: '', skype: '', whatsapp: '', instagram: '' });
const [attachments, setAttachments] = useState([]);//attachments: State to store uploaded files or attachments related to the company
//setAttachments: Function to update the attachments state
const compantCtx = useContext(companiesContext);//Uses the useContext hook to access the companiesContext, which provides methods like saveCompany and setErrors

    const SaveCompany = async () => {//Asynchronous function to save the company record
        try {
            console.log('form', form);
            const schema = generateValidationSchema({ controls: [formFields, address, social] });//Generates a validation schema using the provided form field configurations
            await schema.validate(form, { abortEarly: false });//Validates the form state using the schema. If validation fails, it collects all errors instead of stopping at the first error (abortEarly: false)
            const response = await compantCtx.saveCompany(form);//Calls the saveCompany method from the context, passing the form data to save the company details
            console.log('response', response);
            
        } catch (error) {
            const errors = FormValidation(error);
            if (errors) {
                compantCtx.setErrors(errors);
                console.log(errors);

            }
            return;
        }
    }

    const cancel = () => {
        console.log('cancel');
        setForm({ name: '', email: '', phone1: '', phone2: '', fax: '', website: '', ratings: '', owner: '', tags: '', deals: '', source: '', industry: '', contacts: '', currency: '', language: '', description: '', address: '', city: '', state: '', country: '', zip: '', facebook: '', twitter: '', linkedin: '', skype: '', whatsapp: '', instagram: '' });
    }

    return (
        <div
            className="offcanvas offcanvas-end offcanvas-large"
            tabIndex={-1}
            id="offcanvas_add"
        >
            <div className="offcanvas-header border-bottom">
                <h5 className="fw-semibold">Add Company</h5>
                <button
                    type="button"
                    className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    <i className="ti ti-x" />
                </button>
            </div>
            <div className="offcanvas-body">
                <form>
                    <div className="accordion" id="main_accordion">
                        {/* Basic Info */}
                        <div className="accordion-item rounded mb-3">
                            <div className="accordion-header">
                                <Link
                                    to="#"
                                    className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#basic"
                                >
                                    <span className="avatar avatar-md rounded text-dark border me-2">
                                        <i className="ti ti-user-plus fs-20" />
                                    </span>
                                    Basic Info
                                </Link>
                            </div>
                            <div
                                className="accordion-collapse collapse show"
                                id="basic"
                                data-bs-parent="#main_accordion"
                            >
                                <div className="accordion-body border-top">
                                    <DynamicForm formFields={formFields} form={form} setForm={setForm} ctx= {compantCtx} />
                                </div>
                            </div>
                        </div>
                        {/* /Basic Info */}
                        {/* Address Info */}
                        <div className="accordion-item border-top rounded mb-3">
                            <div className="accordion-header">
                                <Link
                                    to="#"
                                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#address"
                                >
                                    <span className="avatar avatar-md rounded text-dark border me-2">
                                        <i className="ti ti-map-pin-cog fs-20" />
                                    </span>
                                    Address Info
                                </Link>
                            </div>
                            <div
                                className="accordion-collapse collapse"
                                id="address"
                                data-bs-parent="#main_accordion"
                            >
                                <div className="accordion-body border-top">
                                    <div className="row">
                                        <DynamicForm formFields={address} form={form} setForm={setForm} ctx={compantCtx} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Address Info */}
                        {/* Social Profile */}
                        <div className="accordion-item border-top rounded mb-3">
                            <div className="accordion-header">
                                <Link
                                    to="#"
                                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#social"
                                >
                                    <span className="avatar avatar-md rounded text-dark border me-2">
                                        <i className="ti ti-social fs-20" />
                                    </span>
                                    Social Profile
                                </Link>
                            </div>
                            <div
                                className="accordion-collapse collapse"
                                id="social"
                                data-bs-parent="#main_accordion"
                            >
                                <div className="accordion-body border-top">
                                    <div className="row">
                                        <DynamicForm formFields={social} form={form} setForm={setForm} ctx={compantCtx} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Social Profile */}
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <button
                            type="button"
                            //data-bs-dismiss="offcanvas"
                            className="btn btn-light me-2"
                            onClick={cancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={SaveCompany}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default NewCompany;