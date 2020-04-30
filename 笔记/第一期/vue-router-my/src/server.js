let express = require('express');//vue起服务 内置靠的就是express
let app = express();
app.get('/getUser', (req, res) => {
  res.json({ name: 'zf' })
})
app.listen(3000)