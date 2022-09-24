const express = require('express')

const app = express()



app.get('/posts', (req, res)=> {
  res.send({myAss: "reeeeee"})
})






app.listen(3000)