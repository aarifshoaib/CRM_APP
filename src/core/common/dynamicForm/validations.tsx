import * as Yup from 'yup';

export const generateValidationSchema = ({ controls }) => {
    const schema = {};
    const allFields = controls.flat();

    allFields.forEach((field) => {
        let validation;
        const fieldType = field.inputType || field.type || 'string';

        // Handle 'select' type fields (including the source field validation)
        //if (fieldType === 'select') {
            //if (field.isMulti?.toString() === 'true') {
                //validation = Yup.array()
                    //.of(
                       // Yup.object().shape({
                            //value: Yup.string().required('Selection is required'),
                       // })
                   // )
                   if (fieldType === 'select') {
                    if (field.isMulti) {
                        validation = Yup.array()
                            .of(
                                Yup.object().shape({
                                    value: Yup.string().required('Selection is required'),
                                })
                            )
                    .min(1, `${field.title || 'Selection'} is required`)
                    .nullable()
                    .transform((value) => (value === '' ? null : value)); // Treat empty as null
            } else {
                validation = Yup.object()
                    .nullable()
                    .required(`${field.title || 'Field'} is required`)
                    .transform((value) => (value === '' ? null : value)); // Treat empty as null
            }
        } else if (fieldType === 'email') {
            validation = Yup.string()
                .nullable()
                .email(`${field.title} is not a valid email address`);
        } else if (fieldType === 'tel') {
            validation = Yup.string()
                .nullable()
                .matches(/^[0-9]{10}$/, `${field.title} must be a valid phone number (10 digits)`);
        } else if (fieldType === 'url') {
            validation = Yup.string()
                .nullable()
                .url(`${field.title} must be a valid URL`);
        } else if (fieldType === 'number') {
            validation = Yup.number()
                .nullable()
                .typeError(`${field.title} must be a valid number`);
        } else if (fieldType === 'date') {
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
            originalValue === '' ? null : value
        );

        schema[field.field] = validation;
    });

    return Yup.object().shape(schema);
};