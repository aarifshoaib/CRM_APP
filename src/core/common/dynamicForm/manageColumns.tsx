import React, { useState } from "react";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";

interface Field {
    title?: string;
    field?: string;
    heading?: string;
    isList?: boolean;
    [key: string]: any;
}

interface ColumnVisibilityManagerProps {
    fields: Field[];
    onVisibilityChange: (visibleColumns: Record<string, boolean>) => void;
}

const ColumnVisibilityManager: React.FC<ColumnVisibilityManagerProps> = ({ fields, onVisibilityChange }) => {
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
        fields.reduce((acc, field) => {
            if (field.field && field.isList && field.isPrimary) acc[field.field] = true; // Default to all columns visible
            return acc;
        }, {} as Record<string, boolean>)
    );

    const handleVisibilityChange = (field: string, checked: boolean) => {
        const updatedVisibility = { ...visibleColumns, [field]: checked };
        setVisibleColumns(updatedVisibility);
        onVisibilityChange(updatedVisibility);
    };

    return (

        <div className="dropdown me-2">
            <Link to="#" className="btn bg-soft-purple text-purple" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                <i className="ti ti-columns-3 me-2" /> Manage Columns </Link>
            <div className="dropdown-menu  dropdown-menu-md-end dropdown-md p-3">
                <h4 className="mb-2 fw-semibold"> Want to manage datatables? </h4>
                <p className="mb-3"> Please drag and drop your column to reorder your table and enable see option as you want. </p>
                <div className="border-top pt-3">
                    {fields
                        .filter((field) => field.isList)
                        .map((field) => (

                            <div className="d-flex align-items-center justify-content-between mb-3" key={field.field}>
                                <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />  {field.heading || field.title}
                                </p>
                                <div className="status-toggle" key={field.field}>
                                    <input type="checkbox" id={field.field} className="check" checked={visibleColumns[field.field]} onChange={(e) =>
                                        handleVisibilityChange(field.field, e.target.checked)
                                    } />
                                    <label htmlFor={field.field} className="checktoggle" />
                                </div>
                            </div>
                        ))}

                </div>
            </div>
        </div>

    );
};

export default ColumnVisibilityManager;



// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Name
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-name" className="check" />
//         <label htmlFor="col-name" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Phone
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-phone" className="check" />
//         <label htmlFor="col-phone" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Email
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-email" className="check" />
//         <label htmlFor="col-email" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Tags
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-tag" className="check" />
//         <label htmlFor="col-tag" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Location
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-loc" className="check" />
//         <label htmlFor="col-loc" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Rating
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-rate" className="check" />
//         <label htmlFor="col-rate" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Owner
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-owner" className="check" />
//         <label htmlFor="col-owner" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Contact
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-contact" className="check" defaultChecked />
//         <label htmlFor="col-contact" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between mb-3">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Status
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-status" className="check" />
//         <label htmlFor="col-status" className="checktoggle" />
//     </div>
// </div>
// <div className="d-flex align-items-center justify-content-between">
//     <p className="mb-0 d-flex align-items-center">
//         <i className="ti ti-grip-vertical me-2" /> Action
//     </p>
//     <div className="status-toggle">
//         <input type="checkbox" id="col-action" className="check" />
//         <label htmlFor="col-action" className="checktoggle" />
//     </div>
// </div>