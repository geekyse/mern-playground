export const getOptionHtml = (item) => {

    if (undefined === item.name) {
        return <option key={''} value=''></option>;
    }

    if (item.parentId !== null) {
        return;
    }

    return getHtml(item);


};

export const getHtml = (item) => {
    return <>
        <option key={item.id} value={item.id}>{item.name}</option>
        {item.children && item.children.map((child, childKey) => {
            child.name = '-' + child.name;
            return getHtml(child);
        })}
    </>;
};
