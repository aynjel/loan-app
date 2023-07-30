const mongoose = require('mongoose');

async function connect(MONGO_URI) {
    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}, exiting...`);
    }
}

module.exports = connect;