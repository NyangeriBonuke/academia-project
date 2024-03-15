const UserUseCase = require('../use-cases/userUseCase')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
require('dotenv').config()

class UserController{
    async userRegister(req, res){
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }

            const {userName, email, password} = req.body

            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)

            await UserUseCase.registerUser(userName, email, hashedPassword)

            const payload = {
                userName: userName,
                email: email
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})

            res.status(200).json({ Message: "User registered successfully", token: token })
        }
        catch(error){
            res.status(500).json(`Error while signing user ${error}`)
        }
    }

    async userLogin(req, res){
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }

            const {email, password} = req.body

            const {token} = await UserUseCase.loginUser(email, password)

            res.status(200).json({ message: "Logged in successfully", token: token })
        }
        catch(error){
            res.status(500).json(`Error while logging in user ${error}`)
        }
    }
}

module.exports = new UserController