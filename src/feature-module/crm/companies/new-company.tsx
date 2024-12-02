import Select from "react-select"
import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import { formFields, address, social } from "./data";
import DynamicForm from "../../../core/common/dynamicForm/dynamicForm";
import { generateValidationSchema } from "../../../core/common/dynamicForm/validations";
import { FormValidation } from "../../../core/common/dynamicForm/form.validation";
import {companiesContext} from "./context/companies.context";

const NewCompany = () => {

    const [form, setForm] = useState({ name: '', email: '', phone1: '', phone2: '', fax: '', website: '', ratings: '', owner: '', tags: '', deals: '', source: '', industry: '', contacts: '', currency: '', language: '', description: '', address: '', city: '', state: '', country: '', zip: '', facebook: '', twitter: '', linkedin: '', skype: '', whatsapp: '', instagram: '' });
    const [attachments, setAttachments] = useState([]);
    const compantCtx = useContext(companiesContext);

    const SaveCompany = async () => {
        try {
            console.log('form', form);
            const schema = generateValidationSchema({ controls: [formFields, address, social] });
            await schema.validate(form, { abortEarly: false });
            const response = await compantCtx.saveCompany(form);
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