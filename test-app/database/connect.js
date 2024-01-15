import { connect } from 'mongoose';
import { config } from 'dotenv';
config();
export async function connectDB() {
    try {
        await connect(process.env.MONGO_URI);
    }
    catch (error) {
        console.log(error);
    }
}
