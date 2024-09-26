import { Schema, model, Document } from 'mongoose';

interface IOTPSchema extends Document {
    userId: string;
    otp: string;
    expiresAt: Date;
}

const OTPSchema = new Schema<IOTPSchema>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});


const OTPModel = model<IOTPSchema>('otp', OTPSchema);

export default OTPModel;
