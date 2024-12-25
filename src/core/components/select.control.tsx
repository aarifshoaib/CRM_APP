import React from 'react';

const SelectControl = ({
    title = '',
    isRequired = false,
    isSearchable = false,
    field = '',
    form = {},
    updateForm = null,
    data = [],
    hasError = null,
    ...props
}) => {
    const handleChange = (e) => {
        const value = e.target.value;
        if (updateForm) {
            updateForm((prevForm) => ({
                ...prevForm,
                [field]: value,
            }));
        }
    };

    return (
        <div className="form-group">
            <label className="col-form-label">
                {title}
                {isRequired && <span className="text-danger"> *</span>}
            </label>
            <select
                className={`form-control ${hasError ? 'is-invalid' : ''}`}
                value={form[field] || ''}
                onChange={handleChange}
                {...props}
            >
                {isSearchable && <option value="">-- Select --</option>}
                {data.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {hasError && (
                <small className="text-danger">
                    {typeof hasError === 'string' ? hasError : hasError[0]}
                </small>
            )}
        </div>
    );
};

export default SelectControl;