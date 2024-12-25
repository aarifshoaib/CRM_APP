import React, { useEffect, useState } from "react";
import CollapseHeader from "../collapse-header";
import { Link } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";
import GenericAntdTable from "../dynamicForm/dynamicTable";
import { Checkbox } from "antd";
import ColumnVisibilityManager from "../dynamicForm/manageColumns";
import ImageWithBasePath from "../imageWithBasePath";
import DynamicGrid from "../dynamicForm/dynamicGrid";

const PageMaster = ({
    data,
    pageCtx,
    formData,
    isColumnManagable = true,
    isExport = true,
    isAddRequired = true,
    isGridView = true,
    addButtonName = '',
    children
}) => {
    const route = all_routes;
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});
    const [fields, setFields] = useState([]);
    const [isListView, setIsListView] = useState(true);

    // Synchronize visible columns when fields change
    useEffect(() => {
        console.log(data);
        let fields = [];
        let flds = data?.sections?.map((section) => {
            section.fields.map((field) => {
                fields.push(field);
            });
        }
        ) || [];
        if (fields && fields.length > 0) {
            setFields(fields);
            setVisibleColumns(
                fields.flat().reduce((acc, field) => {
                    if (field.field && field.isPrimary) acc[field.field] = true;
                    return acc;
                }, {} as Record<string, boolean>) || {}
            );
        }
    }, [data?.sections]);

    const handleVisibilityChange = (fieldKey: string, isVisible: boolean) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [fieldKey]: isVisible,
        }));
    };

    const handleReorder = (newFields: any) => {
        setFields(newFields);
    };

    return (
        <>
            {fields.length > 0 && pageCtx ? (

                <div className="page-wrapper">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="page-header">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h4 className="page-title">
                                                {data?.name} <span className="count-title">{pageCtx?.list.length || 0}</span>
                                            </h4>
                                        </div>
                                        <div className="col-4 text-end">
                                            <div className="head-icons">
                                                <CollapseHeader />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <div className="icon-form mb-3 mb-sm-0">
                                                    <span className="form-icon">
                                                        <i className="ti ti-search" />
                                                    </span>
                                                    <input type="text" className="form-control" placeholder={`Search ${data?.name}`} />
                                                </div>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                                        {isColumnManagable && (
                                                            <ColumnVisibilityManager
                                                                fields={fields} // Pass the fields state directly
                                                                onReorder={handleReorder}
                                                                visibleColumns={visibleColumns}
                                                                onVisibilityChange={handleVisibilityChange}
                                                            />
                                                        )}
                                                        {isGridView && (
                                                            <div className="view-icons me-2">
                                                                <Link to="#" className={isListView ? 'active' : ''} onClick={() => setIsListView(!isListView)}>
                                                                    <i className="ti ti-list-tree" />
                                                                </Link>
                                                                <Link to='#' className={!isListView ? 'active' : ''} onClick={() => setIsListView(!isListView)}>
                                                                    <i className="ti ti-grid-dots" />
                                                                </Link>
                                                            </div>
                                                        )}
                                                        {isExport && (
                                                            <div className="dropdown me-2">
                                                                <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                                                    <i className="ti ti-package-export me-2" /> Export
                                                                </Link>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <ul>
                                                                        <li>
                                                                            <Link to="#" className="dropdown-item">
                                                                                <i className="ti ti-file-type-pdf text-danger me-1" /> Export as PDF
                                                                            </Link>
                                                                        </li>
                                                                        <li>
                                                                            <Link to="#" className="dropdown-item">
                                                                                <i className="ti ti-file-type-xls text-green me-1" /> Export as Excel
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {isAddRequired && (
                                                            <Link to="#" className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_add">
                                                                <i className="ti ti-square-rounded-plus me-2" /> {addButtonName || data?.addButtonName}
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                                            <div className="d-flex align-items-center flex-wrap row-gap-2"></div>
                                        </div>

                                        {isListView && <> <div className="table-responsive custom-table">
                                            <GenericAntdTable
                                                fields={fields} // Ensure updated fields are passed
                                                data={pageCtx?.list}
                                                visibleColumns={visibleColumns}
                                            />
                                        </div>
                                            <div className="row align-items-center">
                                                <div className="col-md-6">
                                                    <div className="datatable-length" />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="datatable-paginate" />
                                                </div>
                                            </div>
                                        </>
                                        }
                                        {!isListView && <div className="row">
                                            <DynamicGrid
                                                fields={fields} // Ensure updated fields are passed
                                                data={pageCtx?.list}
                                                visibleColumns={visibleColumns}
                                                formData={formData}
                                            />
                                        </div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default PageMaster;
