"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaritalStatus = exports.getMaritalStatuses = void 0;
exports.getMaritalStatuses = () => {
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
    ];
};
exports.getMaritalStatus = (id) => {
    let value = {};
    exports.getMaritalStatuses().map((item) => {
        if (item.value === id) {
            value = item;
        }
    });
    return value;
};
