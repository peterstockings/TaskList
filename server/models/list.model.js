const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {type: String, required: true},
}, {
    timestamps: true,
})

const List = mongoose.model('List', listSchema);

module.exports = List;