import User from '../models/User'
import bcrypt from 'bcrypt'

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' })

export const postJoin = async (req, res) => {
	const { nickname, password, password2 } = req.body
	const pageTitle = 'Join'
	if (password !== password2) {
		return res.status(400).render('join', {
			pageTitle,
			errorMessage: 'Password confirmation does not match'
		})
	}

	const exists = await User.exists({ $or: [{ nickname }] })

	if (exists) {
		return res.status(400).render('join', {
			pageTitle,
			errorMessage: 'This nickname is already taken.'
		})
	}

	try {
		await User.create({
			nickname,
			password
		})
		res.redirect('/login')
	} catch (error) {
		return res.status(400).render('join', {
			pageTitle,
			errorMessage: error._message
		})
	}
}

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' })

export const postLogin = async (req, res) => {
	const { nickname, password } = req.body
	const pageTitle = 'Login'
	const user = await User.findOne({ nickname })
	if (!user) {
		return res.status(400).render('login', {
			pageTitle,
			errorMessage: 'An account with this nickname does not exists.'
		})
	}
	const ok = await bcrypt.compare(password, user.password)
	if (!ok) {
		return res.status(400).render('login', {
			pageTitle,
			errorMessage: 'Wrong password'
		})
	}
	req.session.loggedIn = true
	req.session.user = user
	return res.redirect('/')
}

export const logout = (req, res) => {
	req.session.destroy()
	return res.redirect('/')
}
