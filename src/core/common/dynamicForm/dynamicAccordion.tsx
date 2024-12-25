import React from "react";
import DynamicForm from "./dynamicForm";
import { Link } from "react-router-dom";


const DynamicAccordion = ({ form, setForm, companyCtx, data }) => {
    return (
        <div className="accordion" id="main_accordion">
            
             {data.fields?.map((section, index) => (
                <div
                    key={index}
                    className={`accordion-item rounded mb-3 ${index > 0 ? "border-top" : ""}`}
                >
                    <div className="accordion-header">
                        <Link
                            to="#"
                            className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${index}`}
                        >
                            <span className="avatar avatar-md rounded text-dark border me-2">
                                <i className={`${section.icon} fs-20`} />
                            </span>
                            {section.title}
                        </Link>
                    </div>
                    <div
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        id={section.id}
                        data-bs-parent="#main_accordion"
                    >
                        <div className="accordion-body border-top">
                            <DynamicForm
                                formFields={section.fields}
                                form={form}
                                setForm={setForm}
                                ctx={companyCtx}
                            />
                        </div>
                    </div>
                </div>
            ))} 
        </div>
    );
};

export default DynamicAccordion;