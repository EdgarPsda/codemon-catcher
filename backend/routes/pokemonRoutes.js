import express from "express";
import { pokemonByName, pokemons } from "../controller/pokemonController.js";

const router = express.Router();

router.get("/", pokemons);
router.get("/search", pokemonByName);

export default router;