import axios from "axios";
import Pokemon from "../models/Pokemon.js";
import pLimit from "p-limit";
import connectDB from "./db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
connectDB();
const limit = pLimit(10); //Limit to 10 request at time

// Insert data from pokeapi
const savePokemonData = async () => {

    try {
        const response = await axios.get('http://localhost/api/v2/pokemon-form/?limit=1473');
        const formUrl = response.data.results;

        // Refactor
        const savePromises = formUrl.map(spriteUrl => {
            return limit(async () => {
                const pokemonData = await axios.get(spriteUrl.url);
                const newPokemon = new Pokemon({
                    name: spriteUrl.name,
                    pokeId: pokemonData.data.id,
                    sprites: pokemonData.data.sprites.front_default
                });

                await newPokemon.save();
            });
        });

        await Promise.all(savePromises);

    } catch (error) {
        console.log(error.message);
    }
}

const deleteAllDocuments = async () => {
    try {
        await Pokemon.deleteMany({});
        console.log(`documents deleted.`);

    } catch (error) {
        console.log(error.message);
    }
}

const refreshModelData = async () => {
    try {
        await deleteAllDocuments();
        await savePokemonData();
        console.log("Model sucessful updated")
    } catch (error) {
        console.error("Error when update model.");
    }
    finally {
        try {
            await mongoose.connection.close();
            console.log("Database connection closed.");
        } catch (error) {
            console.log("Error trying to close database connection", error);
        }

        process.exit(0);
    }
}


refreshModelData();