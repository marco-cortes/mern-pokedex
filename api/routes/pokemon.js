const { Router } = require("express");

const { getPokemons, getPokemonById, addPokemon, updatePokemon } = require("../controllers/pokemon");

const router = Router();

router.get("/", getPokemons);
router.get("/:id", getPokemonById);
router.post("/new", [], addPokemon);
router.put("/update/:id", [], updatePokemon);

module.exports = router;