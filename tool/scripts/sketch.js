let sketch = p => {

    p.setup = () => {

        let parent = document.getElementById('sketchparent');
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;



        let c = p.createCanvas(w, h);
        p.background(180);
        
        c.parent(parent);
    }

    p.draw = () => {

        p.noStroke();
    }

    p.mouseDragged = () => {
        switch (window.tool) {
            case "Pen":
                p.fill(0, 0, 0);
                p.ellipseMode(p.CENTER);
                p.ellipse(p.mouseX, p.mouseY, 5, 5);
                break;
        
            case "Marker":
                p.fill(255, 97, 108);
                p.rectMode(p.CENTER);
                p.rect(p.mouseX, p.mouseY, 15, 15);
                break;
                
            default:
                console.log("No tool selected");
                break;
        }
    }

    p.windowResized = () => {
        let parent = document.getElementById('sketchparent');
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;

        p.resizeCanvas(w, h);
        p.background(180);

    }
}

let mySketch = new p5(sketch, 'sketch');