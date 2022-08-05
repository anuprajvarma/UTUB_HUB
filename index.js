const express = require('express')
const fs = require('fs')
const youtubedl = require('youtube-dl')

const app = express();

app.get('/', (req, res) => {
    res.send("Hii there ")
})

app.post('/search', (req, res) => {
    const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA')

    video.on('info', function (info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
    })

    video.pipe(fs.createWriteStream('myvideo.mp4'))
})

app.listen(5400, () => {
    console.log("server is started on 5400")
})