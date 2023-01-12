const { v4: uuidv4} = require('uuid')

class Tarea {
    
    id = ''
    description = ''
    completado = null

    constructor(desc){
        this.id = uuidv4(); //Genera un id unica de foma sincrona
        this.description = desc;
        this.completado = null;
    }
}

module.exports = Tarea