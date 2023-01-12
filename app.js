const axios = require("axios");
require("colors");

const {getEvents, guardarEventDB, guardarDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  confirm,
  listadoEventSearch
} = require("./helpers/inquirer");

const Events = require("./models/events");

const main = async () => {
  /* const datostest = await test1();
  console.log(datostest); */

  //Inicia la app Haciendo la peticion y trayendo los eventos
  llamadaAxios().then(async () => {
    console.log("Guardado con exito");
    console.log(arrayPokemon);

  }); 

  //Una vez termina la peticion y se guardan los datos en un array local (arrayPokemon) al pasar 5seg inicia el menu con sus datos iniciales
  setTimeout(async () => {

    const events = new Events() //Inicializo la clase de Eventos
    const eventsDB = getEvents(); //Recogemos lo que ya tenemos guardado en BD

    if (eventsDB.length < arrayPokemon.length) { 
      console.log("LA PETICION AXIOS TRAJO MAS ELEMENTOS");
      const ok = await confirm("Desea sobre escribir?"); //true or false
      if (ok) {
        //Sobreescribimos en la BD y cargo en events con el array que se inicializo con axios
        guardarEventDB(arrayPokemon);
        events.cargarEventsFromArray(arrayPokemon);
      }
      else{
        //Mantenemos los datos
        events.cargarEventsFromArray(eventsDB);
      }
    }
    else{
      //En caso de que la BD tenga los mismos o mas datos, la dejamos tal cual
      console.log("No han ocurrido eventos nuevos!");
      events.cargarEventsFromArray(eventsDB);
    }
    
    //console.log(events._listado); 
    let opt = "";
    do {
      opt = await inquirerMenu();
      console.log({ opt });

      //Switch para opciones
      switch (opt) {
        case "1":
          //MOSTRAR EVENTOS   
          events.listarEventos()
          break;
        case "2":
            //MOSTRAR EVENTOS 404  
          const id = await leerInput("Cual desea buscar?")   
          const eventForId = await events.mostrarPorId(id);
          console.log(eventForId);
          break;
        case "3":
            //MOSTRAR EVENTOS 301
            const search = await listadoEventSearch(events.listadoArr);
            if (search !== '0') {
              const searchEventForID = await events.mostrarPorId(search);
              console.log(searchEventForID);
            }
            else{
              console.log("Se cancelo la busqueda");
            }
          break;
        case "4":

          break;
        case "5":
          // CREAMOS EVENTO (TEST)
          const name = await leerInput("Ingrese el nombre:");
          const url = await leerInput("Ingrese la URL:");
          events.crearEvent(name, {name,url})
          break;
        case "6":
            console.log(arrayPokemon);
          break;
      }
      //Cada vez que muestra el menu se carga la BD con los datos como estan en memoria
      guardarEventDB(events.listadoArr);

      await pausa();
    } while (opt !== "0");
  }, 5000);
};

const config = {
  method: "get",
  url: "https://pokeapi.co/api/v2/pokemon",
  /* headers: {
      Authorization:
        "Bearer 72c3eb631e8f43f6892220e1623ad88f83b4f8b95bdc4d8a8e1e5fb40f46784b",
      Cookie:
        "sentry-sc=aYXlpbXxvM9BrehNMIz5AaIMOIODkn83K1zpPQJEYSe8KIfylIgu3XbPRN5jxkf9; session=eyJhY3RpdmVvcmciOiJxdWVwbGFuLXNwYSJ9:1pEyu0:SOGjQFoE6ShIWPexamByRzs5I0s",
    }, */
};

main();

let arrayPokemon = [];

async function llamadaAxios() {
  console.log("Entrando a la primera llamada de axios");
  return await axios(config)
    .then(function (response) {
      console.log("Se recibio la respuesta");
      arrayPokemon = response.data.results;
    })
    .catch(function (error) {
      console.log(error);
    });
}


/* async function test1 (){
  let data = []
  console.log("Entrando a un test con axios");
    const resolve = await axios(config)
    .then(res => {
      data = res.data.results
    })
    //const res = resolve.json()

    return data;
} */