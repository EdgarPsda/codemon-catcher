
export const formatData = (data) => {
    const dataObj = data.map(element => {
        const obj = {
            name: element.name,
            pokeId: element.pokeId,
            sprite: element.sprites
        }
        return obj;
    });
    return dataObj;
}