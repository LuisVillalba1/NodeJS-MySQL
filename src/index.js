import express from "express";
import router from "./routes/router.js";

import "./config.js"

const app = express();

const puerto = process.env.PORT || 3000;

//todas las peticones en formato json las convertimos en un objeto 
app.use(express.json());
app.use("/api/",router);

//en caso de que el usuario vaya a una ruta no definida
app.use((req,res,next)=>{
    res.status(404).json({
        message : "Ruta no encontrada"
    })
})

app.listen(puerto,()=>{
    console.log(`servidor escuchando en el puerto ${puerto}`);
})