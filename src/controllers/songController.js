import Song from '../models/Song'
import User from '../models/User'

let songs = []
let playlists = []

export const home = async (req, res) => {
	songs = await Song.find({})
	songs = songs.sort((a, b) => {
		return b.meta.listeners - a.meta.listeners
	})
	songs.map((e) => (e.rank = songs.indexOf(e)))

	let user
	if (req.session.user) {
		const {
			user: { _id }
		} = req.session

		user = await User.findById(_id)
		playlists = user.playlist
	} else if (!req.session.user) {
		playlists = []
	}

	return res.render('home', { pageTitle: 'Home', songs, playlists })
}

export const getUpload = (req, res) => {
	return res.render('upload', { pageTitle: 'Upload Music' })
}

export const postUpload = async (req, res) => {
	const { title, singer, runningTime } = req.body
	const { thumb, audio } = req.files
	const isHeroku = process.env.NODE_ENV === 'production'
	const song = new Song({
		title,
		singer,
		thumbUrl: isHeroku ? thumb[0].location : thumb[0].path,
		fileUrl: isHeroku ? audio[0].location : audio[0].path,
		runningTime
	})
	await song.save()
	return res.redirect('/upload')
}

export const registerListener = async (req, res) => {
	const { id } = req.params
	const audio = await Song.findById(id)
	if (!audio) {
		return res.status(404)
	}
	audio.meta.listeners = audio.meta.listeners + 1
	await audio.save()
	return res.status(200)
}

export const addPlaylist = async (req, res) => {
	if (req.session.user) {
		const {
			user: { _id }
		} = req.session

		const user = await User.findById(_id)
		user.playlist.push(req.body)
		user.save()
	}
}

export const deletePlaylist = async (req, res) => {
	if (req.session.user) {
		const {
			user: { _id }
		} = req.session
		const {
			params: { id }
		} = req
		const user = await User.findById(_id)
		const list = user.playlist

		const delSelect = list.findIndex((e) => String(e._id) === String(id))
		list.splice(delSelect, 1)

		user.save()
	}
}
