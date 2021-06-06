
let peerIds = new Set();
let peerEvents = beaker.peersockets.watch();

let toolbar = document.querySelector('.tools-container');

beaker.hyperdrive.getInfo(window.location.href).then(info => {

    console.log(info);
    window.versionNum.innerHTML = info.version;
    document.title = info.title;
    window.appTitle.innerHTML = info.title;
    window.siteURL.href = info.url;

    peerEvents.addEventListener('join', e => {

        peerIds.add(e.peerId);
        window.peercount.innerHTML = peerIds.size;
        window.peerSize = peerIds.size;

        for(let i = 0; i < toolbar.children.length; i++) {
            if(i < window.peerSize) {
                console.log("tool available");
            } else {
                console.log("tool unavailable");
                toolbar.children[i].classList.toggle('locked');
            }
        }
    });
    
    peerEvents.addEventListener('leave', e => {
    
        peerIds.delete(e.peerId);
        window.peercount.innerHTML = peerIds.size;
        window.peerSize = peerIds.size;

        for(let i = 0; i < toolbar.children.length; i++) {
            if(i > window.peerSize) {
                console.log("tool available");
                toolbar.children[i].classList.toggle('locked');
            } else {
                console.log("tool unavailable");
                
            }
        }
    });    

    if(info.peers >= 1) {
        window.tool = "Pen";
    } else {
        window.tool = "None";
    }
});

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
