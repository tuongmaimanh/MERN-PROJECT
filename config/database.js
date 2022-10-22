import mongoose from "mongoose";

export function connect  () {
   return async mongoose.connect('mongodb+srv://admin:admin1234@cluster0.pjndy3c.mongodb.net/?retryWrites=true&w=majority')
            .then(
                console.log('Connected to MongoDb')
            )
            .catch(err => console.log(err))
}
