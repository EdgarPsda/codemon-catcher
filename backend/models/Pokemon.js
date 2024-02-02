const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pokeId: {
        type: Number,
        unique: true
    },
    sprites: {
        type: String,
    }

}, {
    timestamps: true
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon

