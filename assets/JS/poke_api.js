const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.num = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => { // função que comverte para uma lista de json as requisições de detalhes
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) // requisição da lista 
        .then((response) => response.json()) // convertendo resposta para json
        .then((jsonBody) => jsonBody.results) // pegando dentro do json os resultados .results
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // convertendo a lista em novas requisições de detalhes
        .then((detailRequests) => Promise.all(detailRequests)) // requisição de detalhes, em lote
        .then((pokemonDetails) => pokemonDetails) // lista de detalhes 
        .catch((error) => console.error(error)) //
        .finally(() => console.log('Requisição concluida !'))
}
