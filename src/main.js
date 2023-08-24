async function getPokedexData(offset = 0){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
        return response.json();
    }
    catch(error){
        console.error("FAILED", error);
    }
}
async function getPokemonData(pokemonName){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.json();
    }
    catch(error){
        console.error("FAILED", error);
    }
}
async function createPokemon(pokemon){

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
function createPokemonPage(pokedexData){

    pokedexData.results.forEach((pokemon)  => { 
        createPokemon(pokemon)
        
    });

    hideLoadingScreen();
    showPokedex();
       
    return; 
   
}
function removePokemons(){
    const $pokemon = document.querySelectorAll("#pokemon-page img");

    for(let i = 0; i < $pokemon.length; i++){
        $pokemon[i].remove();
    }

    return;
}
function pageChange(pokemonPerPages){

    let $actualPage = document.querySelector("#page").value;
    const totalPages = Number(document.querySelector("#last-page").textContent);

    document.querySelector("#next").onclick = async function(event){

        let $changingPage = document.querySelector("#page").value;

       
        
        if($actualPage === $changingPage){

            hidePokedex();
            showLoadingScreen();

            $changingPage = Number(document.querySelector("#page").value) + 1;
            document.querySelector("#page").value = $changingPage;

            const offset = Number($changingPage - 1) * pokemonPerPages;
            const pokedexData = await getPokedexData(offset);

         
            removePokemons();
            createPokemonPage(pokedexData); 
            pageChange(pokemonPerPages);
 
        }
 
        else if($changingPage <= totalPages && $changingPage >= 1){

            hidePokedex();
            showLoadingScreen();

            const offset = Number($changingPage - 1) * pokemonPerPages;
            const pokedexData = await getPokedexData(offset);

           
            removePokemons();
            createPokemonPage(pokedexData);
            pageChange(pokemonPerPages);
        }
       


    }

    document.querySelector("#previous").onclick = async function(event){
        let $changingPage = document.querySelector("#page").value;

       

        if($changingPage-1 >= 1){
            hidePokedex();
            showLoadingScreen();

            $changingPage = (document.querySelector("#page").value - 1);
            document.querySelector("#page").value = $changingPage;

            const offset = Number($changingPage - 1) * pokemonPerPages;
            const pokedexData = await getPokedexData(offset);

            removePokemons();
            createPokemonPage(pokedexData);  
            pageChange(pokemonPerPages);
        }
    }

} 
function removeTypes($type, $subtype){
    $type.classList = "badge bg";
    $subtype.classList = "badge bg visually-hidden";
    return;

}
function showTypes(data){
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
async function showStats(pokemon){
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
function pokemonSelection(pokedexData){

    document.querySelector("body").onclick = function(event){
        const selectedPokemon = event.target;
        
        if(selectedPokemon.className === "pokemon"){
            showStats(selectedPokemon.id);
            return;
        }
        
        
    }

}
function showTotalPages(totalPages){
    document.querySelector("#last-page").textContent = totalPages;
    return;
}
function hidePokedex(){
    document.querySelector("#pokemon-page").classList.add("visually-hidden");
    return;
}
function showPokedex(){
    document.querySelector("#pokemon-page").classList.remove("visually-hidden");
    return;
}
function showLoadingScreen(){
    document.querySelector("#loading").classList.remove("visually-hidden");
    return;
}
function hideLoadingScreen(){
    document.querySelector("#loading").classList.add("visually-hidden");
    return;
}
async function init(){
    const pokedexData = await getPokedexData();
    const totalPokemon = pokedexData.count;
    const pokemonPerPages = 20;
    const totalPages = Math.ceil(totalPokemon/pokemonPerPages);

    showLoadingScreen();
    createPokemonPage(pokedexData);
    showTotalPages(totalPages);
    pageChange(pokemonPerPages);
    pokemonSelection(pokedexData)

    
    
   
}


init();
