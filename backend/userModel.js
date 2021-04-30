import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteresPassword) {
  return await bcrypt.compare(enteresPassword, this.password)
}

userSchema.pre('save', async function (next) {
  // ONLY DO THIS IF PASSWORD FIELD IS SENT OR MODIFIED
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10) // need salt to encrypt the password
  this.password = await bcrypt.hash(this.password, salt) // Hashed password
})

const User = mongoose.model('User', userSchema)

export default User
