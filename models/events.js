const axios = require("axios");
require('colors');

const Event = require('./event.js')

/* 
    _listado
    {'uuid-31232131312: { {  info } }'}
*/

class Events {

    _listado = {}

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const event = this._listado[key];
            listado.push(event);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    //Funcion para cargar tareas que vienen desde el .JSON
    cargarEventsFromArray(events = []) {
        //console.log(events)
        console.log("Cargando listado con el array");
        events.map(event => {
            this._listado[event.name] = event
        })
        //console.log(this._listado)
    }

    /* REVISARRRRRR! */
    crearEvent(name ,eventInfo = {} ) {
        const event = new Event(name,eventInfo)
        console.log(event)
        this._listado[event.name] = event.infoEvent;
    };

    //Mostrar un listado bonito no en json
    listarEventos() {
        this.listadoArr.forEach((event, index) => {
            //console.log(event)
            const { name, url } = event;
            const num = index + 1;

            console.log(`${String(num).green}. Informacion ${'::'.yellow} ${name} ${'=>'.yellow} ${url}`)
        })
    };


    async mostrarPorId(id){
        const config = {
            method: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
          };
        let event = null;
        console.log(`Entrando a busqueda con Id: ${id}`);
        await axios(config)
        .then(res => {
            if (res.status !== 200) {
                event = new Event()
            }
            else{
                const { name, height } = res.data;
                event = new Event(name, {name, height})
            }
        })
        
        return event;
    }
}

module.exports = Events