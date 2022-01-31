const mongoose = require('mongoose');
require('dotenv').config({ path: 'variable.env' });

const conectarDB = async () => {

    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB Conected');
        
    } catch (error) {
        console.log(error);
        process.exit(1); 
    }

}

module.exports = conectarDB