const Tarea = require("./tarea")

class Tareas{
    _listado = {}
    constructor(){
        this._listado = {}
    }

    get listadoArr(){
        const listado = []
        Object.keys(this._listado).forEach( key => listado.push(this._listado[key]))
        return listado
    }

    cargarTreasFromArray(arr){
        arr.forEach(el => this._listado[el.id] = el)
    }
    crearTarea( desc = ''){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
        console.log(`Se a agregado la tarea con exito`);
    }
    listadoCompleto(){
        this.listadoArr.forEach((el, i)=>{
            const tarea = el
            const idx = ++i
            const {desc, completadoEn} = tarea
            const estado = (completadoEn) ? 'Completada'.green : 'Por hacer'.red
            console.log(`${idx} ${desc}:: ${estado}`);            
        })
    }

    listarPendientesCompletadas(completadas = true){
        let aux = 1
        this.listadoArr.forEach(el => {
            const {desc, completadoEn} = el
            if(completadoEn){
                if(completadas){
                    console.log(`${`${aux}.`.green} ${desc}:: ${`${completadoEn}`.green}`);
                    aux++
                }
            }else{
                if(!completadas){
                    console.log(`${`${aux}.`.green} ${desc}:: ${'Por hacer'.red}`);
                    aux++
                }
            }
        })
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }
    
    toggleCompletadas(ids =[]){
        ids.forEach(el =>{
            const tarea = this._listado[el]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })
    }
}

module.exports = Tareas