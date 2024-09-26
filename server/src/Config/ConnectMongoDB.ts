import mongoose from "mongoose"

const ConnectDb = async () => {
    try {
        const _connect = await mongoose.connect(`${process.env.CONNECTION_STRING as string}`)
        console.log("Database connected : ", _connect.connection.host + "\n" + _connect.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default ConnectDb