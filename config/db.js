const mongoose = require ("mongoose");
require ("dotenv").config({path: "variables.env"});

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("conectada db")
    } catch (error) {
        console.log("Hubo un Error");
        console.log(error);
        process.exit(1); //Para detener una aplicacion de node
        
    }

}

module.exports = conectarDB;