import { showLoadingScreen, showPokedex, hidePokedex, hideLoadingScreen, showPagination, hidePagination } from "./ui/general.js";
import { createPokemonPage, removePokemons, pokemonSelection } from "./ui/pokemon.js";
import { showTotalPages } from "./ui/pagination.js";
import { getPokedexData } from "./api/pokedex.js"

function pageChange(pokemonPerPages){

    let $actualPage = document.querySelector("#page").value;
    const totalPages = Number(document.querySelector("#last-page").textContent);
    const $nextButton = document.querySelector("#next");
    const $backButton = document.querySelector("#previous");

    $nextButton.onclick = async (event) => {

        let $changingPage = document.querySelector("#page").value;
        
        if($actualPage === $changingPage){

            hidePokedex();
            hidePagination();
            showLoadingScreen();

            $changingPage = Number(document.querySelector("#page").value) + 1;
            document.querySelector("#page").value = $changingPage;

            const offset = Number($changingPage - 1) * pokemonPerPages;
            const pokedexData = await getPokedexData(offset);

         
            removePokemons();
            await createPokemonPage(pokedexData);
            hideLoadingScreen();
            showPokedex();
            showPagination();
            pageChange(pokemonPerPages);
 
        } else if($changingPage <= totalPages && $changingPage >= 1){

            hidePokedex();
            hidePagination();
            showLoadingScreen();

            const offset = Number($changingPage - 1) * pokemonPerPages;
            const pokedexData = await getPokedexData(offset);

           
            removePokemons();
            await createPokemonPage(pokedexData);
            hideLoadingScreen();
            showPokedex();
            showPagination();
            pageChange(pokemonPerPages);
        }
       


    }

    $backButton.onclick =  async (event) =>{
        let $changingPage = document.querySelector("#page").value;

        if($changingPage-1 >= 1 && $changingPage-1 <= 65){
            hidePokedex();
            hidePagination();
            showLoadingScreen();

            $changingPage = (document.querySelector("#page").value - 1);
            document.querySelector("#page").value = $changingPage;

            const offset = Number($changingPage - 1) * pokemonPerPages;
            const pokedexData = await getPokedexData(offset);

            removePokemons();
            await createPokemonPage(pokedexData);
            hideLoadingScreen();
            showPokedex();
            showPagination();
            pageChange(pokemonPerPages);
        }
    }

} 

export default async function init(){
    const pokedexData = await getPokedexData();
    const totalPokemon = pokedexData.count;
    const pokemonPerPages = 20;
    const totalPages = Math.ceil(totalPokemon/pokemonPerPages);

   
    await createPokemonPage(pokedexData);
    hideLoadingScreen();
    showPokedex();
    showPagination();
    showTotalPages(totalPages);
    pageChange(pokemonPerPages);
    pokemonSelection(pokedexData)
   
   
}