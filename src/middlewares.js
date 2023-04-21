import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const s3 = new aws.S3({
	credentials: {
		accessKeyId: process.env.AWS_ID,
		secretAccessKey: process.env.AWS_SECRET
	}
})

const isHeroku = process.env.NODE_ENV === 'production'

const multerUploader = multerS3({
	s3: s3,
	bucket: 'dmelon',
	acl: 'public-read',
	contentType: multerS3.AUTO_CONTENT_TYPE
})

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
	},
	storage: isHeroku ? multerUploader : undefined
})
