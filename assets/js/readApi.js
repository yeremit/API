console.log("*** consumo de api ***");

// definir la url que vamos a consumir -----

const url = "https://rickandmortyapi.com/api/character/";

const getData = (api) => {

    return fetch(api)
            .then((response) => response.json())
            .then((json) => {
                imprimirDatos(json)
            })
            .catch((error) => {
                console.log("Error: ",error)
            })

}

let Todadata;
const imprimirDatos = (data) => {
    Todadata = data;
    paraPaginar();
   // console.log (" lo que trajo fue ", data)
   let html = ""
   data.results.forEach(matachito => {
    html += `<div class="cards">`;
    html += `<div>`;  
    html += `<img class="foto" src="${matachito.image}">`;
    html += `</div>`;  
    html += `<div>`;  
    html += `<small class="txtSmall">Nombre</small>`;  
    html += `<p class="txtP">${matachito.name}</p>`;  
    html += `<small class="txtSmall">Especie</small>`;  
    html += `<p class="txtP">${matachito.species}</p>`;
    html += `</div>`;  
    html += `</div>`; 
      // console.log( "LA FOTO [ " + matachito.image + " ] NOMBRE [ " + matachito.name + " ] ESPECIE [ " + matachito.species + " ]");
   });
   document.getElementById("contenedorTodo").innerHTML = html
}
const Anterior = document.getElementById('anterior');
const Siguiente = document.getElementById('Siguiente');

//Programar navegacion de la api

Anterior.addEventListener('click', ()=> {
    getData(Todadata.info.prev);
});

Siguiente.addEventListener('click', ()=> {
    getData(Todadata.info.next);
});

const  paraPaginar =() => {
    if (Todadata.info.prev == null){
        console.log(' Ya no hay mas paginas previas');
        Anterior.style.color = 'currentColor';
        Anterior.style.cursor = 'not-allowed';
        Anterior.style.opacity = '0.5';
        Anterior.style.textDecoration = 'none';
        Anterior.style.pointerEvents = 'none';
    }
    else {
        Anterior.style.removeProperty('pointer-events');
        Anterior.style.removeProperty('color');
        Anterior.style.removeProperty('cursor');
        Anterior.style.removeProperty('opacity');
        Anterior.style.removeProperty('text-decoration');
    }
    if (Todadata.info.next == null){
        console.log('Ya no hay mas paginas siguientes');
        Siguiente.style.color = 'currentColor';
        Siguiente.style.cursor = 'not-allowed';
        Siguiente.style.opacity = '0.5';
        Siguiente.style.textDecoration = 'none';
        Siguiente.style.pointerEvents = 'none';
    }
    else {
        Siguiente.style.removeProperty('pointer-events');
        Siguiente.style.removeProperty('color');
        Siguiente.style.removeProperty('cursor');
        Siguiente.style.removeProperty('opacity');
        Siguiente.style.removeProperty('text-decoration');
    }
}

getData(url);









