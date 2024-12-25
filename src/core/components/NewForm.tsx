// NewForm.js
import React, { useState } from 'react';

const NewForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    dealValue: '',
    currency: '',
    assignee: '',
    dueDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // Handle the form data (e.g., submit to API)
    closeForm();  // Close the form modal after submission
  };

  return (
    <div className="form-container">
      <h2>New Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="dealValue"
          placeholder="Deal Value"
          value={formData.dealValue}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={formData.currency}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="assignee"
          placeholder="Assignee"
          value={formData.assignee}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="dueDate"
          placeholder="Due Date"
          value={formData.dueDate}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Export as default
export default NewForm;