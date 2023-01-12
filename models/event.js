const { v4: uuidv4} = require('uuid')

class Event {
    
    name = ''
    infoEvent = {}

    constructor(name,info){
        this.name = name; //Genera un id unica de foma sincrona
        this.infoEvent = info;
    }
}

module.exports = Event