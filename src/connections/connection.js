import {pool} from "../db.js"

//peticion get, que devuelve todos los empleados
export const getEmpleados = async(req,res)=>{
    const [resultado] = await pool.query(`SELECT * FROM EMPLEADOS`);
    res.json({resultado})
}

//agregar un empleado nuevo a la base de datos
export const postEmpleado = async(req,res)=>{
    const {nombre,salario} = req.body;
    try{
        //agregamos el nuevo usuario a la base de datos
        const [resultado] = await pool.query("INSERT INTO EMPLEADOS (Nombre,Salario) values (?,?)",[nombre,salario]);
        //obtenemos el id correspondiente del nuevo usuario agregado
        const id = resultado.insertId;
        const [rows] = await pool.query(`SELECT * FROM EMPLEADOS WHERE EmpleadoID = (?)`,[id]);
        //devolvemos como ha quedado el nuevo objeto agregado
        res.json({
            message : `Empelado agregado con exito`,
            content : rows[0]
        })
    }
    catch (error){
        res.json({
            menssage : `Ha ocurrido un error: ${error}`
        })
    }
}

//modificamos un empleado entero de la base de datos
export const putEmpleado = async(req,res)=>{
    const {id} = req.params;
    const {Nombre,Salario} = req.body;
    try{
        //si el body no contiene un Nombre o Salario le devolvemos un error
        if(!(Nombre === undefined || Salario === undefined)){
            const [resultado] = await pool.query(`UPDATE EMPLEADOS SET Nombre = (?),Salario = (?) WHERE EmpleadoID = (?)`,[Nombre,Salario,id]);
            //en caso de que no se haya modificado ninguna fila,devolvemos que no se ha encontrado ningun empleado
            if(resultado.affectedRows <= 0){
                return res.status(404).json({
                    message : "No se ha encontrado ningun empleado"
                })
            }
            //devolvemos como ha quedado el objeto almacenado
            const [rows] = await pool.query(`SELECT * FROM EMPLEADOS WHERE EmpleadoID = (?)`,[id]);
            return res.json(rows[0])
        }
        return res.status(400).json({
            message : "Error al recibir la solictud"
        })
    }
    catch(error){
        res.status(404).json({
            message : `Ha ocurrido un error ${error}`
        })
    }
}

export const deleteEmpleado = async(req,res)=>{
    const {id} = req.params;
    try{
        //eliminamos el objeto de la base de datos
        const [respuesta] = await pool.query(`DELETE FROM EMPLEADOS WHERE EmpleadoID = (?)`,[id]);
        //en caso de que no haya sido eliminado ninguno, avisasamos al usuario
        if(respuesta.affectedRows <= 0){
            return res.status(404).json({
                message : "No se ha encontrado ningun empleado"
            })
        }
        res.json({
            message : "Empleado eliminado con exito"
        })
    }
    catch(error){
        res.status(404).json({
            message : `Ha ocurrido un error ${error}`
        })
    }
}

export const pathEmpleado = async(req,res)=>{
    const {id} = req.params;
    const {Nombre,Salario} = req.body;
    try{
        //agregamos los datos del boy correspondientes en nuestra base de datos
        const [respuesta] = await pool.query(`UPDATE EMPLEADOS SET Nombre = IFNULL(?, Nombre), Salario = IFNULL(?, Salario) WHERE EmpleadoID = (?)`,
        [Nombre,Salario,id]);
        //en caso de que no haya sido eliminado ninguno le informamos al usuario
        if(respuesta.affectedRows <= 0){
            return res.json({
                message : "No se ha encontrado ningun empleado"
            })
        }
        //devolvemos como ha quedado el objeto almacenado
        const [rows] = await pool.query(`SELECT * FROM EMPLEADOS WHERE EmpleadoID = (?)`,[id]);
        res.json(rows[0])
    }
    catch(error){
        res.json({
            message : `Ha ocurrido un error : ${error}`
        })
    }
}