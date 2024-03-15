const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserUseCase{
    async registerUser(userName, email, password){
        try{
            const newUser = new User({
                userName: userName,
                email: email,
                password: password
            })

            const savedUser = await newUser.save()
            return savedUser
        }
        catch(error){
            throw new Error(`Error while registering user ${error}`)
        }
    }

    async loginUser(email, password){
        try{
            const user = await User.findOne({email})
            if(!user){
                throw new Error('User not found')
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if(!isPasswordValid){
                throw new Error('Invalid Password')
            }

            const payload = {
                userId: user._id,
                email: user.email
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})

            return { token }
        }
        catch(error){
            throw new Error(`Log in Error ${error}`)
        }
    }
}

module.exports = new UserUseCase