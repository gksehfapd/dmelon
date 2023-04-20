import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	nickname: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	playlist: [
		{
			title: { type: String },
			thumbUrl: { type: String },
			singer: { type: String },
			fileUrl: { type: String },
			runningTime: { type: String },
			audioId: { type: String }
		}
	]
})

userSchema.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 5)
	}
})

const User = mongoose.model('User', userSchema)

export default User
