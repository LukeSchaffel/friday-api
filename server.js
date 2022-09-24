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

const users = [{username: "ringo"}]


app.post('/login', (req, res) => {

  const username = req.body.username
  const user = { name: username }
  
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