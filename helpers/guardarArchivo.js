// Logica para grabar y leer el archivo que tenemos

const fs = require('fs');
const archTask = './db/data.json';
const archEvent = './db/events.json';

const getEvents = () => {
    //Verificar caso en que no esciste existe el archTask
    if (!fs.existsSync(archEvent)) {
        return null
    }
    // en caso de que exisa leemos
    const info = fs.readFileSync(archEvent,{ encoding:'utf-8' });
    //Parseamos la info para que pase a ser un JSON
    const data = JSON.parse(info);
    
    return data;
}

const guardarEventDB = ( data ) => {
    fs.writeFileSync(archEvent, JSON.stringify(data));
}


module.exports = {
    getEvents,
    guardarEventDB
};