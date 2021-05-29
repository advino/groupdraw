import SKETCH from './sketch.js';

let peerIds = new Set();
let peerEvents = beaker.peersockets.watch();

beaker.hyperdrive.getInfo('hyper://c90bd39d0cb8252fb43fe2d7aa13555a581c0fd22a3b5b2ea44afb63eaeb2bb9').then(info => {

    console.log(info);
    window.versionNum.innerHTML = info.version;
});

let mySketch = new p5(SKETCH, 'sketch');

peerEvents.addEventListener('join', e => {

    peerIds.add(e.peerId);
    window.peercount.innerHTML = peerIds.size;
});

peerEvents.addEventListener('leave', e => {

    peerIds.delete(e.peerId);
    window.peercount.innerHTML = peerIds.size;
});

