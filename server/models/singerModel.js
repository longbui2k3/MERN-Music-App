const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const singerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stageName: {
        type: String
    },
    birthDate: {
        type: Date,
        required: true
    },
    nation: {
        type: String,
        required: true
    },
    songs: [{title: String, releaseDate: Date}]
})

const Singer = mongoose.model('Singer', singerSchema)

module.exports = Singer;