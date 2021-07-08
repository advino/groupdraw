
let peerIds = new Set();
let peerEvents = beaker.peersockets.watch();

let toolbar = document.querySelector('.tools-container');
let pen = window.pen;
let marker = window.marker;
let palette = window.palette;

let slider = window.slider;
let sizeCount = window.sizeCount;

window.toolSize = 25;

beaker.hyperdrive.getInfo(window.location.href).then(info => {

    console.log(info);
    window.peerSize = info.peers;
    window.peerCount.innerHTML = info.peers;
    window.networkURL.innerHTML = info.url;


    for(let i = 0; i < window.peerSize; i++) {
        toolbar.children[i].classList.add('unlocked');
    }

    peerEvents.addEventListener('join', e => {

        peerIds.add(e.peerId);
        window.peerCount.innerHTML = peerIds.size;
        window.peerSize = peerIds.size;

        for(let i = 0; i < window.peerSize; i++) {
            toolbar.children[i].classList.add('unlocked');
        }

    });
    
    peerEvents.addEventListener('leave', e => {
    
        peerIds.delete(e.peerId);
        window.peerCount.innerHTML = peerIds.size;
        window.peerSize = peerIds.size;

        for(let i = toolbar.children.length - 1; i >= window.peerSize; i--) {
            toolbar.children[i].classList.remove('unlocked');
        }
    });    

    if(info.peers >= 1) {
        window.tool = "Pen";
    } else {
        window.tool = "None";
    }
});



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

slider.addEventListener('input', (e) => {

    sizeCount.innerHTML = e.target.value;
    window.toolSize = e.target.value;
});