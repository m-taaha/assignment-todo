import mongoose, { mongo } from "mongoose";

//interface (for ts)
interface ILog {
    method: string;
    url: string;
    ip: string;
    status: number;
    message: string;
    stack: string;
    timestamp: Date;
}

//schema 
const logSchema = new mongoose.Schema<ILog>({
    method: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date, 
        default: Date.now
    }
});

const LogModel = mongoose.model<ILog>('Log', logSchema);

export default LogModel;