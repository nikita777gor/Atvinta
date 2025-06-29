export const userComponentDto = (component, count) => {
    return {
        _id: component._id,
        name: component.name,
        sellPrice: component.sellPrice,
        image: component.image,
        count: count
    }
}