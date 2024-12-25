import React, { useState, useEffect } from "react";

const Textbox = ({
    title = "",
    errors = {},
    updateErrors = null,
    isRequired = false,
    form = {},
    field = "",
    onBlur = () => {},
    onChange = null,
    children = null,
    style = {},
    submitEditing = null,
    placeholder = "",
    updateForm = null,
    isPassword = false,
    multiline = false,
    onclear = null,
    type = "text",
    hasError = false,
    clear = false,
    subtext = null,
    size = 3,
    className = "form-control",
    iconOptions = { icon: null, size: 0, color: null },
    datarole = null,
    defaultValue = "",
    inputOptions = { style: null },
    ...props
}) => {
    const [text, setText] = useState(defaultValue || form[field] || ""); // Default value for `text`
    const [isFocused, setIsFocused] = useState(false);
    const [showError, setShowError] = useState(false);

    // Update `form` when `text` changes
    useEffect(() => {
        if (updateForm) {
            updateForm((prevForm) => ({
                ...prevForm,
                [field]: text,
            }));
        }
    }, [text, updateForm, field]);

    // Show or hide errors
    useEffect(() => {
        setShowError(Boolean(hasError));
    }, [hasError]);

    // Clear field when `clear` is true
    useEffect(() => {
        if (clear) {
            setText("");
            if (updateForm) {
                updateForm((prevForm) => ({
                    ...prevForm,
                    [field]: "",
                }));
            }
        }
    }, [clear, updateForm, field]);

    // Handle input changes
    const handleChange = (e) => {
        setText(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`mb-${size}`}>
            <label className="col-form-label">
                {title}
                {isRequired && <span className="text-danger"> *</span>}
            </label>
            <div className={iconOptions.icon ? "icon-form-end" : ""}>
                {iconOptions.icon && (
                    <span className="form-icon">
                        <i className={iconOptions.icon} />
                    </span>
                )}
                {!multiline ? (
                    <input
                        type={type}
                        className={className}
                        onChange={handleChange}
                        value={text}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        {...props}
                    />
                ) : (
                    <textarea
                        className={className}
                        onChange={handleChange}
                        value={text}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        {...props}
                    />
                )}
            </div>
            {showError && (
                <small className="text-danger">
                    {typeof hasError === "string" ? hasError : hasError[0]}
                </small>
            )}
        </div>
    );
};

export default Textbox;