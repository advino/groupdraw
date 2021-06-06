import SKETCH from './sketch.js';

let peerIds = new Set();
let peerEvents = beaker.peersockets.watch();

beaker.hyperdrive.getInfo('hyper://c90bd39d0cb8252fb43fe2d7aa13555a581c0fd22a3b5b2ea44afb63eaeb2bb9').then(info => {

    console.log(info);
    window.versionNum.innerHTML = info.version;
    document.title = info.title;
    window.siteUrl.innerHTML = info.url;

    peerEvents.addEventListener('join', e => {

        peerIds.add(e.peerId);
        window.peercount.innerHTML = peerIds.size;
        window.peerSize = peerIds.size;
    });
    
    peerEvents.addEventListener('leave', e => {
    
        peerIds.delete(e.peerId);
        window.peercount.innerHTML = peerIds.size;
        window.peerSize = peerIds.size;
    });    
});

let mySketch = new p5(SKETCH, 'sketch');

let pen = window.pen;
let marker = window.marker;
let palette = window.palette;

window.tool =  'None';

pen.addEventListener('click', e => {
  if(window.peerSize >= 1) {
      console.log("Pen selected");
      window.tool = "Pen";
  } else {
      console.log("You need at least 1 other person on the network to access this tool");
  }
});

marker.addEventListener('click', e => {
    if(window.peerSize >= 2) {
        console.log("Marker selected");
        window.tool = "Marker";
    } else {
        console.log("You need at least 2 other people on the network to access this tool");
    }
});

palette.addEventListener('click', e => {
    if(window.peerSize >= 3) {
        console.log("Palette selected");
        window.tool = "Palette";
    } else {
        console.log("You need at least 3 other people on the network to access this tool");
    }
});
