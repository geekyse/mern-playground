import * as Yup from 'yup';

export const getSearchFields = (fields) => {
    let filterFields = fields.filter((item) => item.search === true);

    return filterFields;
};

export const getFormFields = (fields, formType) => {
    let filterFields = fields.filter((item) => item[formType] === true);

    return filterFields;
};
export const getDropdownFields = (fields) => {
    let filterFields = fields.filter((item) => item.type === 'dropdown');

    return filterFields;
};

export const getSearchFieldsInitialValues = (fields) => {
    let field = fields.filter((item) => item.search === true);

    let searchFields = {};
    field.map((field) => {
        searchFields[field.name] = field.default;
    });

    return searchFields;
};

export const getFormFieldsInitialValues = (fields, formType) => {
    let field = getFormFields(fields, formType);

    let searchFields = {};
    field.map((field) => {
        searchFields[field.name] = field.default;
    });

    return searchFields;
};

export const getFieldSearchValidation = (field) => {
    return Yup.string();
};
export const getFieldFormValidation = (field, formType) => {
    const validationRules = field[formType + 'Validation'] ? field[formType + 'Validation'] : (field['defaultFormValidation'] ? field['defaultFormValidation'] : []);
    if (validationRules.length > 0) {
        let validationChain = Yup.string();
        validationRules.map((rule) => {
            if (rule === 'required') {
                validationChain = validationChain.required('Required');
            } else if (rule === 'email') {
                validationChain = validationChain.email('Must be valid email');

            }
        });

        return validationChain;
    }

    return Yup.string();
};

export const getSearchValidationSchema = (fields) => {

    let field = fields.filter((item) => item.search === true);

    let schema = {};
    field.map((field) => {
        schema[field.name] = getFieldSearchValidation(field);
    });

    return Yup.object(schema);
};

export const getFormValidationSchema = (fields, formType) => {

    let field = getFormFields(fields, formType);

    let schema = {};
    field.map((field) => {
        schema[field.name] = getFieldFormValidation(field, formType);
    });

    return Yup.object(schema);
};