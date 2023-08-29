import { getPokemonData } from "../api/pokedex.js";

export async function createPokemonPage(pokedexData){

    pokedexData.results.forEach( async (pokemon)  => { 
        createPokemon(pokemon)
        
    }); 

    return; 
   
}
export function removePokemons(){
    const $pokemon = document.querySelectorAll("#pokemon-page img");

    for(let i = 0; i < $pokemon.length; i++){
        $pokemon[i].remove();
    }

    return;
}
export function pokemonSelection(pokedexData){

    document.querySelector("body").onclick = function(event){
        const selectedPokemon = event.target;
        
        if(selectedPokemon.className === "pokemon"){
            showStats(selectedPokemon.id);
            return;
        }
        
        
    }

}
export async function createPokemon(pokemon){

    const pokemonName = pokemon.name;
    const pokemonData = await getPokemonData(pokemonName);
    const $pokemonPage = document.querySelector("#pokemon-page");
    const $pokemon = document.createElement("img");
   
    $pokemon.className =  "pokemon";
    $pokemon.src = pokemonData.sprites.front_default;
    $pokemon.id = pokemonName;
    $pokemon.setAttribute("data-bs-toggle", "modal");
    $pokemon.setAttribute("data-bs-target", "#exampleModal");
    
    
    $pokemonPage.appendChild($pokemon);
}

export async function showStats(pokemon){
    const pokemonData = await getPokemonData(pokemon);
    const $modalHeader = document.querySelector("#title")
    const $staticTemplate = document.querySelectorAll(".progress-bar");
    $modalHeader.textContent = pokemonData.name.toUpperCase();

    showTypes(pokemonData);

    const $image = document.querySelector("#modal-img");
    $image.src = pokemonData.sprites.front_default;

    for(let i = 0; i < $staticTemplate.length; i++){
        $staticTemplate[i].style.width = `${pokemonData.stats[i].base_stat}%`;
    }
    
    return;
}
function removeTypes($type, $subtype){
    $type.classList = "badge bg";
    $subtype.classList = "badge bg visually-hidden";
    return;

}

export function showTypes(data){
    const $type = document.querySelector("#type");
    const $subtype = document.querySelector("#sub-type");

    removeTypes($type, $subtype);
    $type.classList.add(data.types[0].type.name);
    $type.textContent = data.types[0].type.name;

    if(data.types.length > 1){
        $subtype.classList.remove("visually-hidden");
        $subtype.classList.add(data.types[1].type.name)
        $subtype.textContent = data.types[1].type.name;
    }

   return; 

}




