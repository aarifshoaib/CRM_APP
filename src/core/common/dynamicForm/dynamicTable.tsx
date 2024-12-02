import React from "react";
import { Table } from "antd";

// Define the type for a field object
interface Field {
    type?: string;
    title?: string;
    field?: string;
    isRequired?: boolean;
    columnSize?: number;
    isList?: boolean;
    icon?: string;
    heading?: string;
    inputType?: string;
    listType?: string;
    data?: any;
    isSearchable?: boolean;
    isPrimary?: boolean;
    // Add any other properties you need here...
}

// Define the type for the props of the component
interface GenericAntdTableProps {
    fields: Field[][]; // More specific type for fields
    visibleColumns: Record<string, boolean>;
    data: any[]; // More specific type for data
}

const generateColumns = (fields: Field[][], visibleColumns) => {

    return fields.flat()
        .filter((field) => field.isList && visibleColumns[field.field]) // Only include fields that have isList: true
        .map((field) => ({
            title: field.heading || field.title, // Use 'heading' if defined, otherwise fallback to 'title'
            dataIndex: field.field, // Use the field as the dataIndex
            sorter: (a: any, b: any) => {
                const valueA = a[field.field];
                const valueB = b[field.field];

                // Handling null or undefined values
                if (valueA == null && valueB == null) return 0;
                if (valueA == null) return -1;
                if (valueB == null) return 1;

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return valueA - valueB;
                }

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB); // Sort strings lexicographically
                }

                if (Array.isArray(valueA) && Array.isArray(valueB)) {
                    return valueA.length - valueB.length; // Sort by array length, adjust as needed
                }

                return 0; // Default case when values can't be compared
            },
            render: (text: any) => {
                // Handle rendering of icon and text if icon exists
                if (field.icon) {
                    return (
                        <div className="set-star">
                            <i className={`fa ${field.icon} filled me-2`} />
                            {text}
                        </div>
                    );
                }

                // For multi-selects, render tags (assuming text is an array or string of tags)
                if (Array.isArray(text) || (field.listType && field.listType === "tags")) {
                    return (
                        <div>
                            {typeof text === 'string'
                                ? text.split(' ').map((item, index) => (
                                    <span
                                        key={index}
                                        className={
                                            item === "Promotion"
                                                ? "badge badge-tag badge-purple-light"
                                                : "badge badge-tag badge-warning-light"
                                        }
                                    >
                                        {item}
                                    </span>
                                ))
                                : (text && Array.isArray(text)) ? text.map((item: string, index: number) => (
                                    <span
                                        key={index}
                                        className={
                                            item === "Promotion"
                                                ? "badge badge-tag badge-purple-light"
                                                : "badge badge-tag badge-warning-light"
                                        }
                                    >
                                        {item}
                                    </span>
                                )) : null // If text is not an array or a string, return null
                            }
                        </div>
                    );
                }

                // For other types of fields, just display the text
                return text;
            },

        }));
};

// Functional component with props
const GenericAntdTable: React.FC<GenericAntdTableProps> = ({ fields, visibleColumns, data }) => {
    console.log(visibleColumns, 'visibleColumns');
    const columns = generateColumns(fields, visibleColumns);
    console.log(columns);
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 3 }}
        />
    );
};

export default GenericAntdTable;