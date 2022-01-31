
const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();

app.use(cors());
/*
//habilitamos para que puedan eniar json a la app

*/
app.use(express.json());
app.use('/api/subjects', require('./routes/subject'))
app.use('/api/plan', require('./routes/plan'))
/*
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
*/
app.listen(4000, () => {
  console.log('El servidor esta corriendo perfectamente');
})





/* para limpair el puerto*/

process.on('exit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('uncaughtException', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
process.on('SIGTERM', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
