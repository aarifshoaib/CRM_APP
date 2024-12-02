import { useState, useEffect, useLayoutEffect } from "react";
import Select from 'react-select';


const SelectControl = ({ callBackDone = () => { }, returnFullObject = false, title = '', isSearchable= false, isMulti=false, field = '', form = {}, size=3, placeholder = 'Select Item', updateForm = null, label = 'label', value = 'value', itmvalue = null, data = [], hasError = false, isRequired = false, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(itmvalue ? itmvalue : null);
    const [localData, setLocalData] = useState([]);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const _data = data.map((item) => {
                return { label: item[label], value: item[value] }
            });
            setLocalData(_data);
        }
    }, [data]);

    useLayoutEffect(() => {
        if (updateForm) {
            let item = selectedValue;
            if (returnFullObject) {
                item = localData.find((item) => item.value === selectedValue);
            }
            updateForm({ ...form, [field]: item })
        }
    }, [selectedValue])

    useEffect(() => {
        hasError[0] ? setShowError(true) : setShowError(false)
    }, [hasError[0]])

    return (
        <div className={`mb-${size}`}>
            <label className="col-form-label"> {title}
                {isRequired && <span className="text-danger"> *</span>}
            </label>
            <Select
                className="select2"
                classNamePrefix="react-select"
                options={localData}
                placeholder= {placeholder}
                value={itmvalue ? itmvalue : selectedValue ? selectedValue : null}
                onChange={(e) => {setSelectedValue(e)}}
                isSearchable={isSearchable}
                isMulti={isMulti}
                {...props}
            />
            {hasError && <small className="text-muted"><span className="text-danger">{hasError[0]}</span></small>}
        </div>
    )
}

export default SelectControl