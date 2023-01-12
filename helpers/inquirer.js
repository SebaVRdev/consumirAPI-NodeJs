
const inquirer = require('inquirer');
const Tareas = require('../models/tareas');
require('colors');


//Preguntas que queremos hacer en el menu principal
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name:`${'1'.green}. Mostrar Todos los eventos`            
            },
            {
                value: '2',
                name: `${'2'.green}. Ver eventos 404`
            },
            {
                value: '3',
                name: `${'3'.green}. Ver eventos 301`
            },
            {
                value: '4',
                name: `${'4'.green}. En trabajo`
            },
            {
                value: '5',
                name: `${'5'.green}. Cualquier cosa`
            },
            {
                value: '6',
                name: `${'6'.green}. Lo que sea`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
           },
        ]

    }
]

const inquirerMenu = async () => {
    //console.clear();
    console.log('======================================'.green)
    console.log('  Seleccione una opcion'.green)
    console.log('======================================\n'.green)
    
    const {opcion} = await inquirer.prompt(preguntas)

    return opcion;
};

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]

    await inquirer.prompt(question)
};


const leerInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if (value.length === 0) {
                    return `Porfavor ingrese un valor`;
                }

                return true;
            }
        }
    ]

    const { desc } =  await inquirer.prompt(question)
    return desc;
}

const listadoTareasBorrar =  async (tareas = []) => {
    /* {
        value: tareas.id,
        name:`${'1'.green}. Crear Tarea`            
    } */
    //Map genera un nuevo arrglo pero transormando los hijos
    const choices = tareas.map( (tarea, index) => {

        const id = `${index + 1}`.green
        return {
            value: tarea.id,
            name: `${id} ${tarea.description} `
        }
    })

    //Añadir al inicio del arreglo la opcion para volver
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    //Generamos menu y guardamos la opcion
    const {id} = await inquirer.prompt(preguntas);

    return id;
}

//Confirmar borrado
const confirm = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question);

    return ok;
}

const mostrarListadoCheckList =  async (tareas = []) => {
    /* {
        value: tareas.id,
        name:`${'1'.green}. Crear Tarea`            
    } */
    //Map genera un nuevo arrglo pero transormando los hijos
    const choices = tareas.map( (tarea, index) => {

        const id = `${index + 1}`.green;
        return {
            value: tarea.id,
            name: `${id} ${tarea.description} `,
            checked: (tarea.completado) ? true : false //Las que ya esten completadas aparecen seleccionadas
        }
    })


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    //Generamos menu y guardamos la opcion
    const {ids} = await inquirer.prompt(pregunta);

    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirm,
    mostrarListadoCheckList
}