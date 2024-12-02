import * as Yup from 'yup';

export const generateValidationSchema = ({ controls }) => {
    const schema = {};
    const allfields = controls.flat();

    allfields.forEach((field) => {
        let validation;
        const fieldtype = field.inputType || field.type || 'string';

        if (fieldtype === 'select') {
            if (field.isMulti?.toString() === 'true') {
                validation = Yup.array()
                    .of(
                        Yup.object().shape({
                            value: Yup.string().required('Selection is required'),
                        }),
                    )
                    .min(1, `${field.title || 'Selection'} is required`)
                    .nullable()
                    .transform((value) => (value === '' ? null : value)); // Treat empty as null
            } else {
                validation = Yup.object()
                    .nullable()
                    .transform((value) => (value === '' ? null : value))
                    .required(`${field.title || 'Field'} is required`);
            }
        } else if (fieldtype === 'email') {
            validation = Yup.string()
                .nullable()
                .email(`${field.title} is not a valid email address`);
        } else if (fieldtype === 'tel') {
            validation = Yup.string()
                .nullable()
                .matches(/^[0-9]{10}$/, `${field.title} must be a valid phone number (10 digits)`)
                .test('is-tel-required', `${field.title} must be a valid phone number`, function (value) {
                    return value ? /^[0-9]{10}$/.test(value) : true; // Validate only if value exists
                });
        } else if (fieldtype === 'url') {
            validation = Yup.string()
                .nullable()
                .url(`${field.title} must be a valid URL`)
                .test('is-url-required', `${field.title} must be a valid URL`, function (value) {
                    return value ? /^https?:\/\/[\w-]+\.[\w-]+/.test(value) : true; // Validate only if value exists
                });
        } else if (fieldtype === 'number') {
            validation = Yup.number()
                .nullable()
                .typeError(`${field.title} must be a valid number`);
        } else if (fieldtype === 'date') {
            validation = Yup.date()
                .nullable()
                .typeError(`${field.title} must be a valid date`);
        } else {
            validation = Yup.string()
                .nullable()
                .trim(); // Default to string type
        }

        // Apply required validation if needed
        if (field.isRequired) {
            validation = validation.required(`${field.title} is required`);
        }

        // Add transformation for empty strings
        validation = validation.transform((value, originalValue) =>
            originalValue === '' ? null : value,
        );

        // Add the validation for the field to the schema
        schema[field.field] = validation;
    });

    return Yup.object().shape(schema);
};
