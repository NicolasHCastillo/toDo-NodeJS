
require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    inquirerPausa,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')

console.clear();
const main = async()=>{

    let option = ''
    const tareas = new Tareas
    const tareasDb = leerDB()
    if (tareasDb){
        tareas.cargarTreasFromArray(tareasDb)
    }
    
    do{
        option = await inquirerMenu()
        // const tarea = new Tarea('Compara comida')
        switch(option){
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc)
            break;
            case '2':
                // console.log(tareas.listadoArr);
                tareas.listadoCompleto()
            break;
            case '3':
                tareas.listarPendientesCompletadas()
            break
            case '4':
                tareas.listarPendientesCompletadas(false)
            break
            case '5':
                const lista = []
                tareas.listadoArr.forEach(el => {
                    if(!el.completadoEn){
                        lista.push(el)
                    }
                })
                const ids = await mostrarListadoChecklist(lista)
                tareas.toggleCompletadas(ids)
                // console.log(ids);
            break
            case '6':
                const id = await listadoTareaBorrar(tareas.listadoArr)
                const ok = await confirmar('¿Esta seguro?')
                if(ok){
                    tareas.borrarTarea(id)
                }
            break
        }
        guardarDB(tareas.listadoArr)
        await inquirerPausa()
    }while(option!=='0')
    
    // pausa()
}

main()