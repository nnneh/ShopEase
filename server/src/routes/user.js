import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const saltRounds = 10
import User from "../models/user.js"
const userRouter = Router()

userRouter.post('/register', async (req, res) => {
  try {
    //step 1: Check if the email already exists
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(409).send('Email already taken')
    } else {
      //step 2: Hash the password
      req.body.password = await bcrypt.hash(req.body.password, saltRounds)
      // step 3: Create the user in the db
      await User.create(req.body)
      return res.status(201).send('User registered successfully')
    }
  } catch (error) {
    return res.status(500).send('An error occurred during registration.')
  }
})

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    // ---step 1: email should exist
    const user = await User.findOne({ email: email })
    // --- no: return email not found
    if (!user) {
      return res.status(404).send({ message: 'Email not found' })
    }

    // ---yes:
    // step 2: check if password matches to that of db
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(401).send({ message: 'Invalid password' })
    }

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })
    return res.status(200).send({
      message: 'Logged in successfully',
      user: user,
      isLoggedIn: true,
      token
    })
  } catch (error) {
    return res.status(500).send('An error occurred during login.')
  }
})

userRouter.get("/users", async (req, res) => {
  try {
    let data;
    if (req.query.role) {
      // If role is provided, find users with that role and who are not approved
      data = await User.find({ role: req.query.role, isApproved: false });
    } else {
      // If no role is provided, find all users
      data = await User.find();
    }
    // Respond with 200 OK and send the found data
    return res.status(200).send(data);
  } catch (error) {
    // If an error occurs during the database query or other operations,
    // respond with 500 Internal Server Error and a message
    // console.error("Error fetching users:", error); // Log the error for debugging
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// userRouter.get('/users', async (req, res) => {
//   try {
//     const data = await User.find()
//     return res.status(200).send(data)
//   } catch (error) {
//     return res.status(500).send('An error occurred while fetching users.')
//   }
// })

userRouter.get("/users/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id)
    if (!data) {
      return res.status(404).send('User not found.')
    }
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send('An error occurred while fetching the user.')
  }
})

export default userRouter