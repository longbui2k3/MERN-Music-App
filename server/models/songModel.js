const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song;