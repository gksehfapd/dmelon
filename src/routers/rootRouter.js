import express from 'express'
import { home, getUpload, postUpload, addPlaylist } from '../controllers/songController'
import { getJoin, postJoin, getLogin, postLogin, logout } from '../controllers/userController'
import { audioUpload } from '../middlewares'

const rootRouter = express.Router()

rootRouter.route('/').get(home).post(addPlaylist)

rootRouter
	.route('/upload')
	.get(getUpload)
	.post(audioUpload.fields([{ name: 'audio' }, { name: 'thumb' }]), postUpload)

rootRouter.route('/join').get(getJoin).post(postJoin)

rootRouter.route('/login').get(getLogin).post(postLogin)

rootRouter.get('/users/logout', logout)

export default rootRouter
