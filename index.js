const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const youtubedl = require('youtube-dl-exec');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5400;


app.post('/search', (req, res) => {
    const link = req.body.url;
    console.log(link)
    const video = youtubedl(link)

    video.pipe(fs.createWriteStream('myvideo.mp4'))
})

if (process.env.NODE_ENV = "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log(`server is started on ${PORT}`)
})