import Konva from 'konva';
import { movePointAlongMatrix } from 'helpers/canvas';

import InnerWheel from 'assets/images/wheel_inner.png';

export default class {
  constructor(props) {
    this.type = props.type;
    this.scene = props.scene;
    this.renderedWheel = null;

    this.layers = {
      wheel: new Konva.Layer(this.scene.defaultLayerOptions),
      circuit: new Konva.Layer(this.scene.defaultLayerOptions),
      nodes: new Konva.Layer(this.scene.defaultLayerOptions),
    }

    this.state = {
      rotation: 0,
    }
  }  

  get props() {
    console.log(this)
    if (this.type === 'inner') {
      return {
        image: InnerWheel,
        segments: 3,
      }
    }
    return null;
  }

  rotate(direction) {
    const angle = direction === 'right' ? -45 : 45;
    this.state.rotation = this.state.rotation + angle;

    this.layers.wheel.rotation(this.state.rotation);
    this.layers.circuit.rotation(this.state.rotation);
    this.layers.nodes.rotation(this.state.rotation);

    this.scene.batchDraw();
  }

  get diameter() {
    return (this.renderedWheel.width() - 40) * this.renderedWheel.attrs.scaleX;
  }

  get radius() {
    return this.diameter / 2;
  }

  get radialXAxis() {
    return {
      x: this.scene.center.x + this.radius, 
      y: this.scene.center.y,
    }
  }

  placeNode(angle, offset) {
    /*
     * If inner circle, then 3 parts each 120deg
     * 0.25 (angle %) * 120 = 30
     * Need to take vector and add angle
     */
    // Computed using: (𝑥2,𝑦2)=(𝑥1+𝑙⋅cos(𝑎),𝑦1+𝑙⋅sin(𝑎))
    const angleMatrix = { 
      x: this.scene.center.x + this.radius * Math.cos(-30 * Math.PI / 180),
      y: this.scene.center.y + this.radius * Math.sin(-30 * Math.PI / 180)
    };

    this.drawDebugLine('red', this.scene.center, this.radialXAxis);
    this.drawDebugLine('green', this.scene.center, angleMatrix);

    const coords = movePointAlongMatrix(this.scene.center, angleMatrix, 0.75);
    this.drawNode(coords);
  }

  drawNode(coords) {
    const node = new Konva.Circle({
      x: coords.x,
      y: coords.y,
      fill: 'purple',
      radius: 5
    });

    this.layers.nodes.add(node).draw();
  }

  drawDebugLine(color, vector1, vector2) {
    var line = new Konva.Line({
      points: [vector1.x, vector1.y, vector2.x, vector2.y],
      stroke: color,
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    }); 
    this.layers.nodes.add(line).draw();
  }

  draw() {
    const { image } = this.props;
     
    this.scene.drawImage('InnerWheel', image, this.layers.wheel, (renderedImage) => {
      this.renderedWheel = renderedImage;
      
      this.placeNode(0.75, 0.25);
    });

  }
}