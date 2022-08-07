const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const youtubedl = require('youtube-dl-exec');
const ytdl = require("ytdl-core");
const path = require('path')
require('dotenv').config();
const http = require('http')
const cors = require('cors');
const { Server } = require('socket.io');
const { SocketAddress } = require('net');


const app = express();
const server = http.createServer(app)

const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,

};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT;

// app.post('/download', async (req, res) => {
//     try {
//         const youtubeUrl = req.body.url;
//         console.log(youtubeUrl);

//         const info = await ytdl.getBasicInfo(youtubeUrl);

//         const fileName =
//             info.videoDetails.title +
//             " by " +
//             info.videoDetails.author.name +
//             "-" +
//             new Date().getTime().toString();
//         // const video = await youtubedl(link);

//         // console.log(video)

//         // video.on('info', (info) => {
//         //     console.log('Download started')
//         //     console.log('filename: ' + info._filename)
//         //     console.log('size: ' + info.size)
//         // })

//         // video.on('complete', (info) => {
//         //     console.log('filename: ' + info._filename + ' downloaded.')
//         // })

//         // video.on('end', () => {
//         //     console.log('finished downloading!')
//         // })

//         // video.pipe(fs.createWriteStream('myvideo.mp4'))
//         ytdl(youtubeUrl)
//             .pipe(fs.createWriteStream(`${process.cwd()}/downloads/${fileName}.mp4`))
//             .on("finish", async () => {
//                 console.log("Download complete");

//                 const file = `${fileName}`;
//                 io.sockets.emit('receive-download-finished', { file })
//             })
//             .on("ready", () => {
//                 console.log("Download started");
//                 io.sockets.emit('receive-download-started')
//             })
//             .on("error", (error) => {
//                 console.log(error)
//             });
//     } catch (error) {
//         console.log('error: ', error)
//         res.status(500).json({ error })
//     }
// })

app.get(
    "/download/:file",
    async (req, res) => {
        const file = req.params.file;
        console.log("file: ", file)

        res.status(200).download(`${process.cwd()}/downloads/${file}.mp4`);
    }
);

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

server.listen(PORT, () => {
    console.log(`server is started on ${PORT}`)
})

const io = new Server(server, { cors: corsOptions })

io.on('connect', (client) => {
    console.log('client with id:', client.id, 'connected')

    client.on('receive-download-start', async ({ youtubeUrl }) => {
        // const info = await ytdl.getBasicInfo(youtubeUrl);

        // const fileName =
        //     info.videoDetails.title +
        //     " by " +
        //     info.videoDetails.author.name +
        //     "-" +
        //     new Date().getTime().toString();

        const fileName = 'myfile'
        ytdl(youtubeUrl)
            .pipe(fs.createWriteStream(`${process.cwd()}/downloads/${fileName}.mp4`))
            .on("finish", async () => {
                console.log("Download complete");

                const file = `${fileName}`;
                io.sockets.emit('receive-download-finished', { file })
            })
            .on("ready", () => {
                console.log("Download started");
            })
            .on("error", (error) => {
                console.log(error)
            });
    })

    client.on('disconnect', () => {
        console.log('user disconnected ' + client.id)
    })
})