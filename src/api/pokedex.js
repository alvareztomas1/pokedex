export async function getPokedexData(offset = 0){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
        return response.json();
    }
    catch(error){
        console.error("FAILED", error);
    }
}
export async function getPokemonData(pokemonName){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.json();
    }
    catch(error){
        console.error("FAILED", error);
    }
}
