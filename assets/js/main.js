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

*/
const pokemonLista = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 9;
let offset = 0;

function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}" >
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                 <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    </ol>
                    <ol class="abilities">
                        ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join(' ')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        `
        ).join('')
        pokemonLista.innerHTML += newHtml

    })
}

loadPokemon(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemon(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemon(offset, limit)
    }
})

/*
    const novaLista = pokemonList.map(convertPokemonToLi).join('') 
    // const novaLista = pokemonList.map(convertPokemonToLi) Isso é a mesma coisa que const novaLista = pokemonList.map((pokemon) => convertPokemonToLi(pokemon)) <= isso
    
    mesma coisa que isso =>
    const newHtml = novaLista
    pokemonLista.innerHTML += newHtml

    //const listItens = []

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        listItens.push(convertPokemonToLi(pokemon))
    }
    console.log(listItens) 
*/