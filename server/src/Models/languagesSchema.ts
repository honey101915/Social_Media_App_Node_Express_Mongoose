import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Language document
interface ILanguage extends Document {
    name: string;
    code: string;
    nativeName: string;
    direction: 'LTR' | 'RTL';
    isActive: boolean;
}

// Define the schema using TypeScript types
const languageSchema: Schema<ILanguage> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensures the language name is unique
    },
    code: {
        type: String,
        required: true,
        unique: true, // Example: 'en' for English, 'fr' for French
        uppercase: true, // Ensures the language code is stored in uppercase
        trim: true, // Removes any leading or trailing whitespace
    },
    nativeName: {
        type: String,
        required: true, // Example: 'English' for English, 'Français' for French
    },
    direction: {
        type: String,
        enum: ['LTR', 'RTL'], // LTR for left-to-right languages, RTL for right-to-left languages
        default: 'LTR', // Default direction is left-to-right
    },
    isActive: {
        type: Boolean,
        default: true, // Indicates if the language is active/available
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    versionKey: false, // Disables the __v version key
});

// Export the model using ES6 syntax
export default mongoose.model<ILanguage>('languages', languageSchema);
