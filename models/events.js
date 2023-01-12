const { v4: uuidv4 } = require('uuid')
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
}

module.exports = Events