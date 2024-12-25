import React from "react";
import SelectControl from "../../components/select.control";
import Textbox from "../../components/textbox.control";
import Checkbox from "../../components/checkbox.control";

const DynamicForm = ({ formFields, form, setForm, ctx }) => {
    const handleFieldChange = (field, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value,
        }));
    };

    return (
        <div className="row">
            {formFields.map((field, index) => {
                if (field.isformField === false) return null;

                // Use consolidated error
                const error = ctx.errors?.[field.field];

                return (
                    <div key={index} className={`col-md-${field.columnSize || 12}`}>
                        {field.type === 'textbox' ? (
                            <Textbox
                                title={field.title}
                                isRequired={field.isRequired}
                                field={field.field}
                                updateForm={setForm}
                                form={form}
                                type={field.inputType || 'text'}
                                hasError={!!error}
                                placeholder={field.placeholder}
                                {...field}
                            />
                        ) : field.type === 'select' ? (
                            <SelectControl
                                title={field.title}
                                isRequired={field.isRequired}
                                isSearchable={field.isSearchable}
                                field={field.field}
                                form={form}
                                updateForm={setForm}
                                data={field.data}
                                hasError={!!error}
                                {...field}
                            />
                        ) : field.type === 'checkbox' ? (
                            <Checkbox
                                title={field.title}
                                field={field.field}
                                checked={form[field.field] || false}
                                onChange={(e) => handleFieldChange(field.field, e.target.checked)}
                            />
                        ) : field.type === 'custom' && field.render ? (
                            field.render(field, form, setForm, ctx)
                        ) : (
                            <div>Unsupported field type: {field.type}</div>
                        )}
                        {error && <small className="text-danger">{error}</small>}
                    </div>
                );
            })}
        </div>
    );
};

export default DynamicForm;