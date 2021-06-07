let sketch = p => {

    p.setup = () => {
        p.createCanvas(500,500);
        p.background(255, 245, 158);
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
}

let mySketch = new p5(sketch, 'sketch');