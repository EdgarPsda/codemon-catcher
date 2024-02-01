import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import pokemonRoutes from "./routes/pokemonRoutes.js";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

// Routing
app.use("/api/pokemons", pokemonRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

