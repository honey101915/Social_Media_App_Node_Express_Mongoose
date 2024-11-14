import mongoose, { Schema, Document } from 'mongoose';

interface followerSchemaInterface extends Document {
    followTo?: Schema.Types.ObjectId;
    followBy?: Schema.Types.ObjectId;
}

const followersSchems: Schema<followerSchemaInterface> = new Schema({
    followTo: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    followBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model<followerSchemaInterface>('followers', followersSchems);
