import { ReactP5Wrapper } from "react-p5-wrapper";

const sketch = (p5) => {
    var framesPerSecond = 24;
    var change;
    let circleList = [];
    var circleDiameter = 0;
    
    var delayTimer = 60;
    let gradientBuffer;

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.frameRate(framesPerSecond);
        change = 1;
    
        // Create an off-screen buffer
        gradientBuffer = p5.createGraphics(p5.width, p5.height);
        drawRadialGradient(gradientBuffer, p5.windowWidth / 2,  p5.windowHeight / 2, p5.windowWidth*2 / 2, p5.color(225, 225, 225), p5.color(163, 163, 163));
    
        generateCircleCount(7);
        setInterval(() => generateCircleCount(7), 6000);
      };

  p5.draw = () => {
    p5.image(gradientBuffer, 0, 0);
    p5.noStroke();
    change++;
    delayTimer--;
  
    // Move the origin to the center of the canvas
    p5.translate(p5.width / 2, p5.height / 2);
  
    for (let zz = circleList.length - 1; zz >= 0; zz--) {
      if (circleList[zz].circleProps.lifeSpan <= 0) {
        circleList.splice(zz, 1);
      }
    }
  
    // Update and display each circle
    for (let ii = 0; ii < circleList.length; ii++) {
      circleList[ii].show(change);
    }

    p5.filter(p5.BLUR, 1.5);
  };

function generateCircleCount(circleCount) {
  console.log('called');

  for (let thing = 0; thing < circleCount; thing++) {
    circleDiameter = p5.random(400, 650);
    let circleProps = {
      r: p5.random(20, 50),
      g: p5.random(111, 170),
      b: p5.random(75, 112),
      a: 0,
      circleDiameter: circleDiameter,
      strokeSize: p5.random(5, 15),
      delay: p5.random(25, 165),
      lifeSpan: framesPerSecond * 14,
      fadeThreshold: (framesPerSecond * 9) * 0.5, // Adjusted fade threshold
      isSpawned: false,
    };
    circleList.push(new circleGenerator(circleProps));
  }
};

function drawRadialGradient(buffer, x, y, radius, innerColor, outerColor) {
    buffer.noFill();
    for (let r = radius; r > 0; --r) {
      let inter = p5.map(r, 0, radius, 0, 1);
      let c = p5.lerpColor(innerColor, outerColor, inter);
      buffer.stroke(c);
      buffer.ellipse(x, y, r * 2, r * 2);
    }
  };

class circleGenerator {
    constructor(circleProps) {
      this.circleProps = circleProps; // Store the color object
    }
  
    show(change) {
      p5.stroke(this.circleProps.r, this.circleProps.g, this.circleProps.b, this.circleProps.a); // Use stored color
      p5.strokeWeight(this.circleProps.strokeSize);
      p5.noFill();
      
      // Add shadow properties for glow effect
    //   p5.drawingContext.shadowBlur = 20;
    //   p5.drawingContext.shadowColor = p5.color(this.circleProps.r, this.circleProps.g, this.circleProps.b, this.circleProps.a);

      if (this.circleProps.delay > 0) {
        this.circleProps.delay -= 2;
      } else {
        this.circleProps.lifeSpan -= 1;
        
  
        if (this.circleProps.lifeSpan > this.circleProps.fadeThreshold) {
          this.circleProps.a = p5.constrain(this.circleProps.a + 5, 0, 255);
        } else {
          this.circleProps.a = p5.constrain(this.circleProps.a - 5, 0, 255);
        }
  
        this.circleProps.circleDiameter += 5;
        p5.circle(0, 0, this.circleProps.circleDiameter);
      }

      // Reset shadow properties to avoid affecting other elements
    //   p5.drawingContext.shadowBlur = 0;
    }
  }
};

const Sketch = () => {
  return <ReactP5Wrapper sketch={sketch} />;
};

export default Sketch;