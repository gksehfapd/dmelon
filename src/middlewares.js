import multer from 'multer'

export const localsMiddleware = (req, res, next) => {
	res.locals.loggedIn = Boolean(req.session.loggedIn)
	res.locals.siteName = 'dMelon'
	res.locals.loggedInUser = req.session.user || {}
	next()
}

export const audioUpload = multer({
	dest: 'uploads/',
	limits: {
		fileSize: 10240000
	}
})
