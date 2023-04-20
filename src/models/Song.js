import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
	title: { type: String, required: true },
	thumbUrl: { type: String, required: true },
	singer: { type: String, required: true },
	meta: {
		listeners: { type: Number, default: 0, required: true }
	},
	fileUrl: { type: String, required: true },
	runningTime: { type: String, required: true }
})

const Song = mongoose.model('Song', songSchema)

export default Song
