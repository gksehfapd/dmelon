import express from 'express'
import { registerListener, addPlaylist, deletePlaylist } from '../controllers/songController'

const apiRouter = express.Router()

apiRouter.post('/song/:id/listener', registerListener)
apiRouter.post('/song/:id/addplaylist', addPlaylist)
apiRouter.delete('/song/:id/deleteplaylist', deletePlaylist)

export default apiRouter
