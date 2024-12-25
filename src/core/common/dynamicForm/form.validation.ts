import * as yup from 'yup';

// This function merges and formats validation errors
export const FormValidation = (err) => {
    const mergedErrors = {};

    if (err instanceof yup.ValidationError) {
        err.inner.forEach((item) => {
            const { path, message } = item;

            if (!mergedErrors[path]) {
                mergedErrors[path] = message; // Only take the first error for each field
            }
        });
    }

    return mergedErrors;
};