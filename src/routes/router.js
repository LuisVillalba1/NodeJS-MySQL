import { Router } from "express";
import {deleteEmpleado, getEmpleados,pathEmpleado,postEmpleado, putEmpleado} from "../connections/connection.js"

const router = Router();

router.get("/",(req,res)=>{
    res.send("hola")
})

router.get("/empleados",getEmpleados);

router.post("/empleados",postEmpleado);

router.put("/empleados/:id",putEmpleado);

router.delete("/empleados/:id",deleteEmpleado);

router.patch("/empleados/:id",pathEmpleado);


export default router;