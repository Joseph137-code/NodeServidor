const express       = require("express");
const conectarDB    = require("./config/db");
const cors          = require("cors");


const usuarioRoutes = require("./routes/usuario");
const authRoutes    = require("./routes/auth");
const enlaceRoutes  = require("./routes/enlace");
const archivosRoutes = require("./routes/archivos")


//Crear el Servidor
const app = express();

//Conectar a la Base de Datos
conectarDB();

//Habilitar Cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(opcionesCors) );

//Puerto de la App
const port = process.env.PORT || 4000;

//Leer los Valores del Body
app.use(express.json());

//habiliar Carpeta publica
app.use(express.static(`uploads`));

app.use("/api", usuarioRoutes);
app.use("/api", authRoutes);
app.use("/api", enlaceRoutes);
app.use("/api", archivosRoutes);


//Correr la APP
app.listen(port, '0.0.0.0', () =>{
    console.log(`Corriendo en el Servisor ${port}`);
})