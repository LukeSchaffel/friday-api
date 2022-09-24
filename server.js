require('dotenv').config()
const express = require('express')

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


app.post('/login', (req, res) => {

  const username = req.body.username
  const user = { name: username }
  
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })

})

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})




app.listen(3000)