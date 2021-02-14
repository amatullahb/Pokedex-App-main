const getPokemonProps = (pokemonData) =>  {
    let name = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1, pokemonData.name.length);
    let i;
    if (pokemonData.id >= 100) {
        id = `#${pokemonData.id}`;
    } else if (pokemonData.id >= 10) {
        id = `#0${pokemonData.id}`;
    } else {
        id = `#00${pokemonData.id}`;
    }
    let image = pokemonData.sprites.other['official-artwork']['front_default'];
    let type = pokemonData.types[0].type.name;

    return {name,id,image, type};
}

const getPokemon = (beg,end) => {
    const fetchRequests = [];
    for(let i = beg; i <= end; i++){
        fetchRequests.push(fetch(`http://localhost:4000/pokemon/${i}`).then( res => res.json()));
    }
    return Promise.all(fetchRequests);
}

const renderPokemon = ({name,id, image, type})=> {
    document.querySelector('#pokedex').innerHTML += `<div class="card ${type}"><div class="top"><h4>${name}</h4> <h4>${id}</h4> </div><img src="${image}" height="200px" width="150px"> </div>`;
}

getPokemon(1, 100).then( data => data.map(getPokemonProps)).then(data => data.forEach(renderPokemon));