export const getMaritalStatuses = () => {
    return [
        {
            label: 'Unspecified',
            value: 0
        },
        {
            label: 'Single',
            value: 1
        },
        {
            label: 'Married',
            value: 2
        },

    ]
};
export const getMaritalStatus = (id: number) => {
    let value = {};
    getMaritalStatuses().map((item) => {
        if (item.value === id) {
            value = item;
        }
    });
    return value;
};