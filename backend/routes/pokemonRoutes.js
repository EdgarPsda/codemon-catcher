import express from "express";
import { pokemons } from "../controller/pokemonController.js";

const router = express.Router();

router.get("/", pokemons);

export default router;