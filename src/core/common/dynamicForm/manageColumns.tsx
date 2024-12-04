import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Field {
    title?: string;
    field?: string;
    heading?: string;
    isList?: boolean;
    [key: string]: any;
}

interface ColumnVisibilityManagerProps {
    fields: Field[];
    onReorder: (newFields: Field[]) => void;
    visibleColumns: Record<string, boolean>;
    onVisibilityChange: (fieldKey: string, isVisible: boolean) => void;
}

const ColumnVisibilityManager: React.FC<ColumnVisibilityManagerProps> = ({
    fields,
    onReorder,
    visibleColumns,
    onVisibilityChange,
}) => {
    // Local state for reordering columns
    const [localFields, setLocalFields] = useState<Field[]>([]);

    // Sync local state with fields prop when fields change
    useEffect(() => {
        const listFields = fields.filter((field) => field.isList);
        setLocalFields(listFields);
    }, [fields]);

    const handleDragEnd = (result: any) => {
        const { source, destination } = result;

        console.log(source, destination);

        // If dropped outside the list or no movement, do nothing
        if (!destination || source.index === destination.index) return;

        // Reorder localFields based on drag-and-drop
        const reorderedFields = [...localFields];

        const [movedField] = reorderedFields.splice(source.index, 1);

        reorderedFields.splice(destination.index, 0, movedField);

        console.log(reorderedFields);
        // Update local state and notify parent of reordering
        setLocalFields(reorderedFields);
        onReorder(reorderedFields); // Pass reordered fields to the parent
    };

    const handleVisibilityToggle = (fieldKey: string, isVisible: boolean) => {
        onVisibilityChange(fieldKey, isVisible); // Notify parent about visibility change
    };

    return (
        <div className="dropdown me-2">
            <Link
                to="#"
                className="btn bg-soft-purple text-purple"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
            >
                <i className="ti ti-columns-3 me-2" /> Manage Columns
            </Link>
            <div className="dropdown-menu dropdown-menu-md-end dropdown-md p-3">
                <h4 className="mb-2 fw-semibold">Want to manage datatables?</h4>
                <p className="mb-3">
                    Please drag and drop your column to reorder your table and enable options as
                    you want.
                </p>
                <div className="border-top pt-3">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="columns">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ padding: 0 }}
                                >
                                    {localFields.map((field, index) => (
                                        <Draggable
                                            key={field.field || `field-${index}`}
                                            draggableId={field.field || `field-${index}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="d-flex align-items-center justify-content-between mb-3"
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        padding: "10px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                        backgroundColor: "#f9f9f9",
                                                        marginBottom: "8px",
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <p className="mb-0 d-flex align-items-center">
                                                        <i className="ti ti-grip-vertical me-2" />
                                                        {field.heading || field.title}
                                                    </p>
                                                    <div className="status-toggle">
                                                        <input
                                                            type="checkbox"
                                                            id={field.field}
                                                            className="check"
                                                            checked={!!visibleColumns[field.field]}
                                                            onChange={(e) =>
                                                                handleVisibilityToggle(
                                                                    field.field || "",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor={field.field} className="checktoggle" />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder} {/* Ensure the placeholder is rendered */}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default ColumnVisibilityManager;
