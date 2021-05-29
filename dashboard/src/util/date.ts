import moment from 'moment';

export const formatDate = (dateStr: string) => {
    return moment(dateStr).format('Do MMMM YYYY');
};
export const formatDateStandard = (dateStr: string) => {
    return moment(dateStr).format('DD/MM/YYYY HH:mm');
    // return moment(dateStr).calendar();
    // return moment(dateStr).format('L');
};
export const since = (dateStr: string) => {
    // return moment(dateStr).endOf('day').fromNow();
    return moment(dateStr).fromNow();
};