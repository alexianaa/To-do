const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect(
        "mongodb+srv://alexnaa:WKmTkJfaeX8RWjL@todolist.onctowi.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDB Atlas CONNEECTED") )
    .catch((err) => console.log(err))
}

module.exports = connectToDb;