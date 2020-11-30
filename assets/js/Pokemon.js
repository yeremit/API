const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";



const getData = (api, opc) => {

    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            if (opc == 1)
                imprimirDatos(json);
            else
                obtenerUrl(json);
        })
        .catch((error) => {
            console.log("Error: " , error)
        });
};

let html;
const obtenerUrl = (data) => {
    TodaData = data;
    paraPaginar();

    data.results.forEach(pokemon => {
        html="";
        getData(pokemon.url,1)
    });
}
document.getElementById("containerAPI").innerHTML += `
            <h1>Pokemon API</h1>
            <button class=" btn btn-primary button-prev" id="btnPrev">Anterior </button>
            <button class=" btn btn-primary button-next" id="btnNext">Siguiente</button>
            <div id="poke_container" class="poke-container"></div>
            `;// Escaped with too many `"`

const imprimirDatos = (data) => {

    const type = data.types.map(type => type.type.name);

    html += `<div class="pokemon">`;
    html += `<div class="img-container">`;
    html += `<img src="${data.sprites.other.dream_world.front_default}">`;
    html += `</div>`;
    html += `<div class="info">`;
    html += `<span class="number">#${data.id.toString().padStart(3, '0')}</span>`;
    html += `<h3 class="name">${data.name}</h3>`;
    html += `<small class="type">Tipo: <span>${type}</span></small>`;
    html += `</div>`;
    html += `</div>`;

    document.getElementById("poke_container").innerHTML = html;


};

const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

btnPrev.addEventListener('click', ()=>{

    getData(TodaData.previous);

});

btnNext.addEventListener('click', ()=>{
    getData(TodaData.next);

});




const paraPaginar =() =>{
    console.log("" +TodaData.next )

    if (TodaData.previous == null) {
        console.log (" Ya no hay mas paginas previas ");
        btnPrev.style.display = "none";
        btnPrev.hidden = true;
    }else {
        console.log ("  si hay mas paginas previas  ");
        btnPrev.style.display = "";
        btnPrev.hidden = false;
    }
    if (TodaData.next == null) {
        console.log (" Ya no hay mas paginas siguientes ");
        btnNext.style.display = "none";
        btnNext.hidden = true;
    } else {
        console.log (" si hay mas paginas siguientes ");
        btnNext.style.display = "";
        btnNext.hidden = false;
    }
}


getData(url,0);

