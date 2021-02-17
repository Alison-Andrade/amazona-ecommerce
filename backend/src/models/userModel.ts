import mongoose from 'mongoose'
import { UserModel } from '../@types/types'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
}, {
    timestamps: true
})

const User = mongoose.model<UserModel>("User", userSchema)

export default User