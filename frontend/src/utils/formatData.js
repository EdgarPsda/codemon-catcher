
export const formatData = (data) => {
    const dataObj = data.map(element => {
        const obj = {
            name: element.name,
            poke_id: element.pokeId,
            sprite: element.sprites,
            id: element._id
        }
        return obj;
    });
    return dataObj;
}