//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usr agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweets);

    //Cuando el documento esté cargado en su totalidad
    document.addEventListener('DOMContentLoaded',()=>{
    tweets = JSON.parse(localStorage.getItem('tweets')) || []; //si no hay ningun tweet creame un array vacío
    crearHTML();
    });
}

function agregarTweets(e){
    e.preventDefault();
    console.log('Agregar tweets');

    //Text Area donde se escribe el tweet
    const tweet = document.querySelector('#tweet').value;
    
    //Validación
    if(tweet === ''){
        mostarError('El mensaje no puede ir vacío');
        return ; //previene que no se sigan ejecutando lineas 
    }

    const tweetObj ={
        id: Date.now(),
        tweet:tweet,
    }
    tweets = [...tweets, tweetObj]; //...tweets anterior , tweet obj-> actual

    //Una vez agregado, creamos el html
    crearHTML();

    //Reiniciar formulario
    formulario.reset();

}

//Mostrar mensaje de error
function mostarError(error){
    // limpiarHTML();
    const msjError = document.createElement('p');
    msjError.classList.add('error');
    msjError.textContent = error;

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(msjError);
    //a los 3 seg 
    setTimeout(()=>{
        msjError.remove();
    },2000);
}



//Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach((tweet)=>{
            const li = document.createElement('li');

            //Añadir al texto al html
            li.innerText = tweet.tweet;

            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a local storage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//Función para limpiar el html
function limpiarHTML(){
    while(listaTweets.firstChild){ //mientras haya algo dentro de resultado
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
