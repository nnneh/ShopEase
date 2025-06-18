import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const saltRounds = 10
import User from "../models/user.js"
const userRouter = Router()

userRouter.post('/register', async (req, res) => {
  //step  1 Check if the email already exists
    const user = await User.findOne({ email: req.body.email })
    if(user) return res.send('Email already taken')
    else{
  //step 2: Hash the password
      req.body.password = await bcrypt.hash(req.body.password, saltRounds)
  // step 3: Create the user in the db
      User.create(req.body)
    }
    return res.send('user registered')
  })


  userRouter.post('/login', async (req, res) => {
    const {email, password} = req.body
    // ---step 1: email should exist
    const user = await User.findOne({ email: email })
    // --- no: return email not found
    if(!user) return res.send({message: 'Email not found'})
   
    // ---yes: 
      // step 2: check if password matches to that of db
      const isMatched = await bcrypt.compare(password, user.password)
      if(!isMatched) return res.send({message: 'Invalid password'})
      
      const token = await jwt.sign({ email: email }, 'da77735d96d5e7ede93459711deda6204a6616a8e3d7f44f1b4b02ce619d17ed21e10137b876e819f9cc6a9d740ea4431a243a57c1b6de0fbfe9a60541855f21');

      return res.send({
          message: 'logged in successfully',
          user: user,
          isLoggedIn: true,
          token
        })
  })



  userRouter.get('/users', async (req, res) => {
    const data = await User.find()
    return res.send(data)
  })
export default userRouter