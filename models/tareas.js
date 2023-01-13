require('colors');

const Tarea = require('./tarea.js')

/* 
    _listado
    {'uuid-31232131312: {id: 12, description:'ddasdasdas', completado: ssadhdjsak}'}
*/

class Tareas {

    _listado = {}

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    //Funcion para cargar tareas que vienen desde el .JSON
    cargarTareasFromArray(tareas = []) {
        tareas.map(tarea => {
            this._listado[tarea.id] = tarea
        })
        //console.log(this._listado)

    }

    crearTarea(description = '') {
        const tarea = new Tarea(description)
        this._listado[tarea.id] = tarea;
    };

    //Mostrar un listado bonito no en json
    listarTareas() {
        this.listadoArr.forEach((tarea, index) => {
            //console.log(index+1)
            const { description, completado } = tarea;
            const num = completado !== null ?
                `${String(index + 1).green}` :
                `${String(index + 1).red}`;

            const estado = completado !== null ?
                'Completada'.green :
                'Pendiente'.red;

            console.log(`${num}. ${description} :: ${estado}`)


            /* if (tarea.completado === null) {
                console.log(`${String(index+1).red}. ${tarea.description} :: ${"Pendiente".red}`)
            }
            else{
                console.log(`${String(index+1).green}. ${tarea.description} :: ${"Completada".green}`)
            } */
        })
    };


    borrarTarea(id = '') {
        //Veamos si existe o no
        if (this._listado[id]) {
            //En caso de que exista lo borramos
            delete this._listado[id];
        }
        
    };

    listarTareasPendientesCompletadas(completadas = true) {

        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { description, completado } = tarea;

            const estado = completado !== null ?
                'Completada'.green :
                'Pendiente'.red;

            if (completadas) {
                //Mostramos completadas
                if (completado) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${description} :: ${estado}`)
                }
            }
            else {
                //Mostramos pendientes
                if (!completado) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${description} :: ${estado}`)
                }
            }
        });
        console.log();
    }

    completarTareas(ids = []){
        //Completamos
        ids.forEach(id => {
            //Obtengo la tarea segun el id
            const tarea = this._listado[id];

            //Si ya estaba previamente completada no hacemos nada
            if (!tarea.completado) {
                tarea.completado = new Date().toISOString(); //Guardamos la fecha actual como string
            }

        });

        //Toda aquella que no venga marcada se le quita el completado
        this.listadoArr.forEach(tarea => {
            //Si el id de cada tarea no viene incluido en el arreglo de ids que vienen marcado le quitamos el completado
            if (!ids.includes(tarea.id)) {
                //Lo ponemos en null
                this._listado[tarea.id].completado = null; 
            }
        })
    }
}

module.exports = Tareas