import app from './app.js';

import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await sequelize.sync({ force: false});
        console.log("Conectado a la base de datos");
        app.listen(PORT)
        console.log("Servidor ejecutandose en el puerto ", PORT);
    } catch (error) {
        console.log(error);
    }
}

main();