let sketch = p => {


    p.setup = () => {
        p.createCanvas(500,500);
    }

    p.draw = () => {
        p.background(159, 194, 178);
        let peer = document.getElementById('peercount').innerHTML;
        p.textSize(32);
        p.text(peer, p.width/2, p.height/2, 25);
    }
}

export default sketch;