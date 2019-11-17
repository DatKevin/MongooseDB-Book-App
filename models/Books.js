let mongoose = require("mongoose")
let Schema = mongoose.Schema

let BookSchema = new Schema({
	title: String,
	author: String,
	image: String,
	releaseDate: String,
})

let BookModel = mongoose.model("Book", BookSchema)

module.exports = BookModel