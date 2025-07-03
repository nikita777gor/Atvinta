export const productionComponentDto = (component, count, maxCount) => {
    const setStatuses = [];
    for(let i = 0; i < maxCount; i++){
        setStatuses[i] = i < count ? true : false;
    }
    return {
        _id: component._id,
        icons: component.icons,
        name: component.name,
        setStatuses: setStatuses
    }
}