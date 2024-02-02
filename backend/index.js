const express = require("express");
const { connectDB } = require("./config/db.js");
const dotenv = require("dotenv");
const pokemonRoutes = require("./routes/pokemonRoutes.js");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Routing
app.use("/api/pokemons", pokemonRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

