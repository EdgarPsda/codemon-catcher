import Pokemon from "../models/Pokemon.js";

const pokemons = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    try {
        const total = await Pokemon.countDocuments({}); // Get the total pokemons count
        const pages = Math.ceil(total / pageSize); // Calculate how many pages we can get
        const skip = (page - 1) * pageSize; // Calculate how many documents will be skipped 
        const pokemons = await Pokemon.find({}).sort({ pokeId: 1 }).skip(skip).limit(pageSize);

        const nextPage = (page < pages) ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null;
        const prevPage = (page > 1) ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;

        res.json({
            count: total,
            next: nextPage,
            previous: prevPage,
            results: pokemons
        });

    } catch (error) {
        console.log(error.message);
    }
}

export { pokemons };