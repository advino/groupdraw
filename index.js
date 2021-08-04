let hyperdrive = require('hyperdrive');
let hyperswarm = require('hyperswarm');
let mirror = require('mirror-folder');
let path = require('path');
const mkdirp = require('mkdirp');
const pump = require('pump');

let dir = path.join(process.cwd(), 'tool');
mkdirp.sync(dir);

let swarm = hyperswarm();
let archive = hyperdrive('storage_two/');
 

archive.ready(() => {

    updateArchive(archive, dir, {watch: true});
    
    swarm.join(archive.discoveryKey, {lookup: true, announce: true});
    swarm.on('connection', (socket, details) => {

        pump(socket, archive.replicate(false, {live: true}), socket);
    });

    console.log(`Seeding @ hyper://${archive.key.toString('hex')}`);
});

function updateArchive(a, d, o) {

    // Mirror files from folder into the Hyperdrive
    let progress = mirror(d, {name: '/', fs: a}, o, err => {
        if(err) throw err;
        console.log('Uploaded files');
    });

    // Listen for each file uploaded and list the file
    progress.on('put', src => {
        console.log('Uploading', src.name);
    });
}