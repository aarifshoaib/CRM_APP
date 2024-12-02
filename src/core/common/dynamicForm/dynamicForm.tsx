import SelectControl from "../../components/select.control";
import Textbox from "../../components/textbox.control";

const DynamicForm = ({ formFields, form, setForm, ctx }) => {
    return (
        <div className="row">
            {
                formFields.map((field, index) => (
                    <div key={index} className={`col-md-${field.columnSize}`}>
                        {
                            field.isformField === undefined || field.isformField === null || field.isformField ? (
                                field.type === "textbox" ? (
                                    <Textbox
                                        title={field.title}
                                        isRequired={field.isRequired}
                                        field={field.field}
                                        updateForm={setForm}
                                        form={form}
                                        type={field.inputType || "text"}
                                        hasError={ctx.errors[field.field]}
                                        placeholder={field.placeholder}
                                        {...(field.iconOptions && { iconOptions: field.iconOptions })}
                                        {...(field.className && { className: field.className })}
                                        {...(field["data-role"] && { "data-role": field["data-role"] })}
                                        {...(field.defaultValue && { defaultValue: field.defaultValue })}
                                        {...(field.multiline && { multiline: field.multiline })}
                                        {...(field.rows && { rows: field.rows })}
                                    />
                                ) : (
                                    <SelectControl
                                        title={field.title}
                                        isRequired={field.isRequired}
                                        isSearchable={field.isSearchable}
                                        field={field.field}
                                        form={form}
                                        updateForm={setForm}
                                        data={field.data}
                                        hasError={ctx.errors[field.field]}
                                        {...(field.isMulti && { isMulti: field.isMulti })}
                                        {...(field.defaultValue && { defaultValue: field.defaultValue })}
                                    />
                                )
                            ) : null // If formFields is not undefined or null, nothing is rendered
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default DynamicForm;
