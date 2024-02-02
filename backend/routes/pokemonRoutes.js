const express = require("express");
const { pokemons, pokemonByName } = require("../controller/pokemonController.js");

const router = express.Router();

router.get("/", pokemons);
router.get("/search", pokemonByName);

module.exports = router;