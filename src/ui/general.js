

export function hidePokedex(){
    document.querySelector("#pokemon-page").classList.add("visually-hidden");
    return;
}
export function showPokedex(){
    document.querySelector("#pokemon-page").classList.remove("visually-hidden");
    return;
}
export function showLoadingScreen(){
    document.querySelector("#loading").classList.remove("visually-hidden");
    return;
}
export function hideLoadingScreen(){
    document.querySelector("#loading").classList.add("visually-hidden");
    return;
}
export function hidePagination(){
    return document.querySelector("#pagination").classList.add("visually-hidden");
}
export function showPagination(){
    return document.querySelector("#pagination").classList.remove("visually-hidden");
}





