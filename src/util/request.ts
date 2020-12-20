export const ValidationError = (field: string, error: string, status = 400) => {

    return {
        'status': status,
        'name': 'Error',
        'message': error,
        'errors': [
            {
                'value': '',
                'msg': error,
                'param': field,
                'location': 'body',
            },
        ],
    };
};

export const ServerError = (error: string = '', status = 500) => {

    return {
        'status': status ? status : 'Server Error',
        'name': 'Error',
        'message': error,
        'errors': [],
    };
};