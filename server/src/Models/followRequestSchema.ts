import mongoose, { Schema, Document } from 'mongoose';

interface followRequestInterface extends Document {
    followRequestTo?: Schema.Types.ObjectId;
    followRequestBy?: Schema.Types.ObjectId;
}

const followRequestSchema: Schema<followRequestInterface> = new Schema({
    followRequestTo: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    followRequestBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model<followRequestInterface>('followRequests', followRequestSchema);
