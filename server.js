require('dotenv').config()
const express = require('express')

const bcrypt = require('bcrypt')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
const authenticateToken = require('./middleware/auth.js').authenticateToken

const posts = [
  {
    username: 'luke',
    post: 'hellow, me, please allow me to introuce me to me =)'
  },
  {
    username: 'ringo',
    post: 'awooooooffffffffffff '
  }
]

const users = []


app.post('/login', async (req, res) => {

  const user = users.find(user => user.name = req.body.name)
  if (user === null){
    return res.status(400).send('Username or Password is incorrect')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)){
      console.log("login successful")
    } else {
      res.send('Username or Password is incorrect')
    }
  } catch {
    res.status(500).send
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })

})

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

app.get('/users', (req, res)=> {
  res.json(users)
})

app.post('/users', async(req, res) => {
  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = {
      name: req.body.name, 
      password: hashedPassword
    }
    users.push(user)
    res.status(201).send()
  }catch (error){
    console.log(error)
    throw error
  }
})



app.listen(3000)