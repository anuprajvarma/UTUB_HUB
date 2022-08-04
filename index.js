const express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.send("Hii there ")
})

app.listen(5400, () => {
    console.log("server is started on 5400")
})