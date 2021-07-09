
let peerIds = new Set();
let peerEvents = beaker.peersockets.watch();

let toolbar = document.querySelector('.tools-container');
let pen = window.pen;
let marker = window.marker;
let eraser = window.eraser;

let slider = window.slider;
let sizeCount = window.sizeCount;

window.toolSize = 25;
window.tool = 'None';


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

        showSnack('.peerjoin');
    });
    
    peerEvents.addEventListener('leave', e => {
    
        peerIds.delete(e.peerId);
        window.peerCount.innerHTML = peerIds.size;
        window.peerSize = peerIds.size;

        for(let i = toolbar.children.length - 1; i >= window.peerSize; i--) {
            toolbar.children[i].classList.remove('unlocked');
        }

        showSnack('.peerleave');
    });    
});

pen.addEventListener('click', e => {
  if(window.peerSize >= 1) {
        console.log("Pen selected");
        window.tool = "Pen";
    
        setSelection("pen"); 
    } else {
      showSnack('.alert');  
      console.log("You need at least 1 other person on the network to access this tool");
  }
});

marker.addEventListener('click', e => {
    if(window.peerSize >= 2) {
        console.log("Marker selected");
        window.tool = "Marker";

        setSelection("marker"); 

    } else {
        showSnack('.alert');  
        console.log("You need at least 2 other people on the network to access this tool");
    }
});

eraser.addEventListener('click', e => {
    if(window.peerSize >= 3) {
        console.log("Eraser selected");
        window.tool = "Eraser";

        setSelection("eraser");
    } else {
        showSnack('.alert');  
        console.log("You need at least 3 other people on the network to access this tool");
    }
});

slider.addEventListener('input', (e) => {

    sizeCount.innerHTML = e.target.value;
    window.toolSize = e.target.value;
});

function setSelection(target) {

    toolbar.children.forEach(elt => {
        if(elt.id === target) {
            elt.classList.add('selected');
        } else {
            elt.classList.remove('selected');
        }
    });
}

function showSnack(target) {
    let snack = document.querySelector(target);
    snack.style.display = 'flex';

    snack.classList.add('snackbar-active');
    snack.classList.remove('snackbar-passive');


    setTimeout(() => {
        snack.classList.remove('snackbar-active');
        snack.classList.add('snackbar-passive');
        
        
        setTimeout(() => { snack.style.display = 'none'; }, 900);
    }, 2000);
}