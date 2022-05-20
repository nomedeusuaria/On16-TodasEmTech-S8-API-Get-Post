const pokedexJson = require('./models/pokedex.json');
const express = require('express');
const {response} = require('express');
const { type } = require('express/lib/response');
const app = express();

app.use(express.json())

app.listen(3030, () => {
    console.log("Servidor ok!")
});

app.get("/", (request, response) => {
    response.status(200).json([{
        "message": "API de pokemons da primeira geração - Sarah"
    }])
})

app.get("/pokedex", (request, response) => {
    response.status(200).send(pokedexJson)
});

app.get("/pokedex/buscar/:id", (request,response) => {
    let idRequest = request.params.id

    let encontraPokemon = pokedexJson.find(pokemon => pokemon.id == idRequest)

    response.status(200).send(encontraPokemon)

});

app.get("/pokedex/buscar/name", (request, response) => {
    console.log("pegou")
    let pokemonName = request.query.name.toLowerCase()
    console.log(pokemonName)

    let foundPokemon = pokedexJson.filter(
        pokemon => pokemon.name.toLowerCase().includes(pokemonName)
    )
    console.log(foundPokemon)
    response.status(200).send(foundPokemon)
});

app.get("/pokedex/filtro", (request, response) => {

    console.log("Entrou")
    let typeRequest = request.query.type.toLowerCase()
    console.log(typePokemon)

    let tipoPokemon = pokedexJson.find(
        pokemon => pokemon.type.toLowerCase().includes(typeRequest)
    )
    response.status(201).send(tipoPokemon)
})

app.post("/pokedex", (request, response) => {
    let bodyRequest = request.body

    let novoPokemon = {

        id: (pokedexJson.length) +1,
        name: bodyRequest.name,
        type: bodyRequest.type
    }
    pokedexJson.push(novoPokemon)

    response.status(201).json([{
        "message": "Pokemon cadastrado!",
        novoPokemon
    }])
})
