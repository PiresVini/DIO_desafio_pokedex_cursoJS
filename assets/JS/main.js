const pokeList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 4;
let offset = 0;


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.num}</span>
                <a class="linkdetalhe" href="detail.html?number=${pokemon.num}&photo=${pokemon.photo}&name=${pokemon.name}&type=${pokemon.type}" target="_blank"><span class="name">${pokemon.name}</span></a>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokeList.innerHTML += newList;

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    loadMoreButton.disabled = true;
    setTimeout(() => {
        offset += limit;
        loadPokemonItens(offset, limit)
        loadMoreButton.disabled = false;
    }, 2000);
})