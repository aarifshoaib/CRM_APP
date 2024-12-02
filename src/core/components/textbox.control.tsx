import { useState, useEffect } from "react";

export class TextboxProps {
    title?: string;
    subtext?: string;
    errors?: any;
    updateErrors?: any;
    isRequired?: boolean;
    form?: any;
    field?: string;
    children?: any;
    style?: any;
    placeholder?: string;
    placeholderColor?: string;
    updateForm?: any;
    showError?: boolean;
    isPassword?: boolean;
    multiline?: boolean;
    hasError?: any;
    iconOptions?: { icon: string, size: number, color: string };
    iconClearOptions?: { icon: string, size: number, color: string };
    inputOptions?: { style: any };
    clear: boolean;
    className?: string;
    datarole?: string;
    defaultValue?: string;

    constructor(props: TextboxProps) {
        this.title = props.title;
        this.errors = props.errors;
        this.updateErrors = props.updateErrors;
        this.isRequired = props.isRequired;
        this.form = props.form;
        this.field = props.field;
        this.children = props.children;
        this.showError = props.showError;
        this.style = props.style;
        this.placeholder = props.placeholder;
        this.placeholderColor = props.placeholderColor;
        this.updateForm = props.updateForm;
        this.isPassword = props.isPassword;
        this.multiline = props.multiline;
        this.hasError = props.hasError;
        this.iconOptions = props.iconOptions;
        this.iconClearOptions = props.iconClearOptions;
        this.inputOptions = props.inputOptions;
        this.clear = props.clear;
        this.subtext = props.subtext;
        this.className = props.className;
        this.datarole = props.datarole;
        this.defaultValue = props.defaultValue;
    }
}

const Textbox = (
    {
        title,
        errors = {},
        updateErrors = null,
        isRequired = false,
        form = {},
        field = '',
        onBlur = null,
        onChange = null,
        children = null,
        style = {},
        submitEditing = null,
        placeholder = '',
        updateForm = null,
        isPassword = false,
        multiline = false,
        onclear = null,
        type = 'text',
        hasError = false,
        clear = false,
        subtext = null,
        size = 3,
        className = 'form-control',
        iconOptions = { icon: null, size: 0, color: null },
        datarole = null,
        defaultValue = null,
        inputOptions = { style: null }, ...props
    }) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (updateForm) {
            updateForm({ ...form, [field]: text })
        }
        return () => {

        }
    }, [text]);

    const onchange = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        hasError[0] ? setShowError(true) : setShowError(false)
    }, [hasError[0]])

    useEffect(() => {
        if (clear) {
            updateForm({ ...form, [field]: '' })
            setText('');
        }
    }, [clear])

    return (
        <div className={`mb-${size}`}>
            <label className="col-form-label">{title}
                {isRequired && <span className="text-danger"> *</span>}
            </label>
            {iconOptions.icon && <div className="icon-form-end">
                <span className="form-icon">
                    <i className={iconOptions.icon} />
                </span>
                {!multiline &&
                    <input type={type} className={className} onChange={onchange}
                        value={text || ''} onBlur={onBlur}
                        placeholder={placeholder}
                        {...props} />
                }
                {multiline &&
                    <textarea className={className} onChange={onchange}
                        value={text || ''} onBlur={onBlur}
                        placeholder={placeholder}
                        {...props} />
                }
                
            </div>}
            {!iconOptions.icon && !multiline &&
                <input type={type} className={className} onChange={onchange}
                    value={text} onBlur={onBlur}
                    placeholder={placeholder}
                    {...props}
                />
            }
            {!iconOptions.icon && multiline &&
                <textarea className={className} onChange={onchange}
                    value={text} onBlur={onBlur}
                    placeholder={placeholder}
                    {...props}
                />
            }

            {hasError && <small className="text-muted"><span className="text-danger">{hasError[0]}</span></small>}
        </div>
    )
}
export default Textbox
