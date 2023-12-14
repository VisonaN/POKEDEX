const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

/**
    fetch(url) // Promisse e sua interface
    .then(function (response) {
        return response.json()
    })
    .then(function (jsonBody) {
        console.log(jsonBody)
    })                              Tudo função de callback
    .catch(function (error) {
        console.error(error)
    })
    .finally(function () {
        console.log('Requisição concluída!')
    })

*/

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon">
    <span class="number">#001</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
            <li class="type">Grass</li>
            <li class="type">Poison</li>
        </ol>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
            alt="${pokemon.name}">
    </div>
</li>
`
}

const pokemonLista = document.getElementById('pokemonList')

fetch(url) // Promisse e sua interface usando arrow function
    .then((response) => response.json()) // Quando tiver uma linha pode fazer assim na arrow function, sem corpo && O que vai no primeiro .then() é o retorno da promisse, nesse caso a fetch(url)
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => {
        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];
            pokemonLista.innerHTML += convertPokemonToLi(pokemon)
        }
    }) // O que vai pro segundo .then() é o retorno do primeiro .then()
    .catch((error) => console.error(error))
    .finally(() => console.log('Requisição concluída!'))
