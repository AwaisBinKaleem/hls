//https://medium.com/@HoseungJang/video-streaming-with-node-js-9401213a04e7

const ffmpeg = require('fluent-ffmpeg')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')

const videoPath = 'videos/video.mp4'

ffmpeg(videoPath,{timeout:432000}).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10', //Set length of segmented video in seconds
    '-hls_list_size 0',
    '-f hls'
]).output('videos/output.m3u8').on('end',()=>{
    console.log('end')
}).run()