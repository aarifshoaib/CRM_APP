import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";

const DynamicGrid = ({ fields, data, visibleColumns, formData }) => {
    const route = all_routes;
    console.log(data, 'data');
    console.log(fields, 'fields');

    return (
        <>
            {data?.map((item, index) => (
                <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                        <div className="card-body">
                            {fields
                                .filter((field) => field.field in item && field.isList && visibleColumns[field.field])
                                .map((field, fieldIndex) => (
                                    <div key={fieldIndex}>
                                        {(field.isTitle) && (
                                            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                                                <div className="d-flex align-items-center">
                                                    {field.isTitle && <Link
                                                        to={route.companyDetails}
                                                        className="avatar avatar-lg border rounded flex-shrink-0 me-2 mb-3"
                                                    >
                                                    </Link>
                                                    }
                                                    <div>
                                                        {field.isTitle && <h6>
                                                            <Link to={route.companyDetails} className="fw-medium">
                                                                {item[field.field]}
                                                            </Link>
                                                        </h6>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="dropdown table-action">
                                                    <Link
                                                        to="#"
                                                        className="action-icon"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="fa fa-ellipsis-v" />
                                                    </Link>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <Link
                                                            className="dropdown-item"
                                                            to="#"
                                                            data-bs-toggle="offcanvas"
                                                            data-bs-target="#offcanvas_edit"
                                                        >
                                                            <i className="ti ti-edit text-blue" /> Edit
                                                        </Link>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete_contact"
                                                        >
                                                            <i className="ti ti-trash text-danger" /> Delete
                                                        </Link>
                                                        <Link className="dropdown-item" to={route.companyDetails}>
                                                            <i className="ti ti-eye text-blue-light" /> Preview
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {(!field.isTitle) && (
                                            <div className="d-block">
                                                <div className="d-flex flex-column mb-1">
                                                    <p className="text-default d-inline-flex align-items-center mb-2">
                                                        <span className="me-2">{field.title} : </span> 
                                                        {item[field.field]}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
};

export default DynamicGrid;
