const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');
const path = require('path')
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.post('/search', (req, res) => {
    const link = req.body.url;
    console.log(link);
    const video = youtubedl(link);

    var stream = fs.createWriteStream('myvideo.mp4');

    video.pipe(stream);
})

app.get('/test', (req, res) => {
    res.send('API is running....')

})

// --------- deployment ---------- 


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(`client/build`));


    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, +`/client/build/index.html`));
    })

}

// --------- deployment ---------- 

app.listen(PORT, () => {
    console.log(`server is started on ${PORT}`)
})