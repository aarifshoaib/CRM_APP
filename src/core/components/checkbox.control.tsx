import React from 'react';

const Checkbox = ({ title, field, checked, onChange }) => (
    <div>
        <label>
            <input type="checkbox" checked={checked} onChange={onChange} />
            {title}
        </label>
    </div>
);

export default Checkbox;