const fetchPokemon = () =>{
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for(let i = 1; i <= 150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        //console.log(pokemons)

        const listPokemons = pokemons.reduce((accumultor, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumultor += `

        <li class="card">
        <img class="card-image ${types[0]}" alt="${pokemon.name}" src ="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}" />
            <h2 class ="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class ="card-subtitle">${ypes.join(' | ')}</p>
        </li>`
            return accumultor
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')

        console.log(ul.innerHTML)
    })
}

fetchPokemon()