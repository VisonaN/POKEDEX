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



function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}" >
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join(' ')}
        </ol>
        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
    </div>
</li>
`
}

const pokemonLista = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemonList = []) => {
    const newHtml = pokemonList.map(convertPokemonToLi).join('')
    pokemonLista.innerHTML = newHtml

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