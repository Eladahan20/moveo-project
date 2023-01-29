const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    id : {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
});

const Code = mongoose.model('Codeblock', codeSchema);
module.exports = Code;