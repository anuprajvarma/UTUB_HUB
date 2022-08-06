const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/search', (req, res) => {
    const link = req.body.url;
    console.log(link);
    const video = youtubedl(link);

    var stream = fs.createWriteStream('myvideo.mp4');

    video.stderr.pipe(stream);
})

app.listen(5400, () => {
    console.log("server is started on 5400")
})