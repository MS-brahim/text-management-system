import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

const textEntrySchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    paragraphs: [
        {
            text: String,
            hash: String,
            isDuplicate: {
                type: Boolean,
                default: false,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Before saving, split the content into paragraphs and hash each paragraph
textEntrySchema.pre('save', async function (next) {
    if (this.isModified('content')) {
        this.paragraphs = this.content.split('\n').map((paragraph) => ({
            text: paragraph.trim(),
            hash: createHash('sha256').update(paragraph).digest('hex'),
            isDuplicate: false,
        }));
    }
    next();
});


// Method to detect duplicates in the paragraphs
textEntrySchema.methods.detectDuplicates = function () {
    const hashes = new Set();
    this.paragraphs.forEach((paragraph) => {
        if (hashes.has(paragraph.hash)) {
            paragraph.isDuplicate = true;
        } else {
            hashes.add(paragraph.hash);
        }
    });
};

const TextEntry = mongoose.model('TextEntry', textEntrySchema); 
export default TextEntry;