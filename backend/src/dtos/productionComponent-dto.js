export const productionComponentDto = (component, count, maxCount) => {
    return {
        _id: component._id,
        icons: component.icons,
        count: count,
        maxCount: maxCount,
    }
}