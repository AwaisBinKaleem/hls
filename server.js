const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');
const cors = require("cors");

app.use(cors());

app.get('/',(req,res)=>{
    return res.status(200).sendFile(`${__dirname}/client.html`)
})

const server = app.listen(8000)

new hls(server,{
    path: 'videos', // Base URI to output HLS streams
    dir: 'videos',  // Directory that input files are stored
    provider : {
        exists :(req, cb)=>{
            // exists: A function that is ran on all requests. It check a file exists. If you passed null and true to cb, It means a file exists and ready to stream. But if you passed null and false to cb, It means a file not exists.
            const ext = req.url.split('.').pop();
            if(ext !== 'm3u8' && ext !== 'ts'){
                return cb(null,true);
            }
            
            fs.access(__dirname+req.url, fs.constants.F_OK,function (err){
                if(err){
                    console.log("file not exist.");
                    return cb(null,false)
                }
                cb(null,true)
            })
        },
        getManifestStream :(req, cb)=>{
            // getMainfestStream: A function that is ran on requests for .m3u8 file. Pass null and stream to cb.
            const stream = fs.createReadStream(__dirname+req.url)
            cb(null,stream)
        },
        getSegmentStream :(req, cb)=>{
            // getMainfestStream: A function that is ran on requests for .ts file. Pass null and stream to cb.
            const stream = fs.createReadStream(__dirname+req.url)
            cb(null,stream)
        },
    }
})