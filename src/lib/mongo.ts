import mongoose, { ConnectionStates } from "mongoose";
import { handleError } from "@/lib/errorHandler";
import { StatusCodes } from "http-status-codes";

const connection: {isConnected: ConnectionStates} = {isConnected: 0}

export const connectToDb = async () => {
    try {
        if(connection.isConnected) {
            console.log('Using existing connection: ' + connection.isConnected)
            return
        }
        const db = await mongoose.connect(process.env.MONGO_URI!);
        connection.isConnected = db.connections[0].readyState
        console.log('Connection established: ' + connection.isConnected)
    } catch (error: any) {
        handleError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error while connecting to mongo db', error)
    }
}