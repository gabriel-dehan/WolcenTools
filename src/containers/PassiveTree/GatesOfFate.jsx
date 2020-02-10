import Konva from 'konva';
import { map } from 'lodash';

import InnerWheel from 'assets/images/wheel_inner.png';
import { Config, dragBoundFunc, handleDragEvents, handleZoom } from 'helpers/canvas';
import AnimateFireflies from 'vendor/fireflies';

class GatesOfFate {
  constructor(canvas) {
    const { width, height } = Config;
    AnimateFireflies({ number_flies: 100, color: "#fff", elem: `#fireflies` });

    this.stage = new Konva.Stage({
      container: canvas.id, 
      draggable: true,
      width,
      height,
      dragBoundFunc,
    });

    this.layers = {
      background: new Konva.Layer(this.layersOptions),
      inner: {
        wheel: new Konva.Layer(this.layersOptions),
        circuit: new Konva.Layer(this.layersOptions),
        nodes: new Konva.Layer(this.layersOptions),
      },
      middle: {},
      outer: {},
    }

    this.stage.add(this.layers.background);
    this.stage.add(this.layers.inner.wheel);
    this.stage.add(this.layers.inner.circuit);
    this.stage.add(this.layers.inner.nodes);

    this.images = {};

    this.state = {
      rotation: 0,
    }
  }


  get layersOptions() {
    return {
      width: this.stage.width(),
      height: this.stage.height(),
      x: this.stageCenter.x,
      y: this.stageCenter.y,
      offsetX: this.stageCenter.x,
      offsetY: this.stageCenter.y,
    }
  };
  

  get stageCenter() {
    return {
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
    }
  }

  rotate(direction) {
    const angle = direction === 'right' ? -45 : 45;
    this.state.rotation = this.state.rotation + angle;

    map(this.layers.inner, layer => {
      layer.rotation(this.state.rotation)
    });
    this.stage.draw();
  }

  drawImage(name, imagePath, layer, cb) {
    Konva.Image.fromURL(imagePath, (image) => {
      image.setAttrs({
        x: this.stageCenter.x,
        y: this.stageCenter.y,
        scaleX: 0.4,
        scaleY: 0.4,
        offsetX: image.attrs.image.naturalWidth / 2,
        offsetY: image.attrs.image.naturalHeight / 2,
      });

      layer.add(image);
      layer.batchDraw();
      
      this.images[name] = image;
      cb(image)      
    });
  }

  drawNode(angle, offset) {
    
    /*
     * If inner circle, then 3 parts each 120deg
     * 0.25 (angle %) * 120 = 30
     * Need to take vector and add angle
     */
    const wheel = this.images.innerWheel;
    console.log(wheel)
    const wheelDiameter = (wheel.width() - 40) * wheel.attrs.scaleX;
    const innerCircleRadius = wheelDiameter / 2;
    // (𝑥2,𝑦2)=(𝑥1+𝑙⋅cos(𝑎),𝑦1+𝑙⋅sin(𝑎)).
    const x2 = this.stageCenter.x + innerCircleRadius * Math.cos(-30 * Math.PI / 180)
    const y2 =  this.stageCenter.y + innerCircleRadius * Math.sin(-30 * Math.PI / 180)
    var redLine = new Konva.Line({
      points: [this.stageCenter.x, this.stageCenter.y, this.stageCenter.x + innerCircleRadius, this.stageCenter.y],
      stroke: 'red',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    var greenLine = new Konva.Line({
      points: [this.stageCenter.x, this.stageCenter.y, x2, y2],
      stroke: 'green',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    this.layers.inner.nodes.add(redLine).draw();
    this.layers.inner.nodes.add(greenLine).draw();

    const coords = getPositionAlongTheLine(this.stageCenter.x, this.stageCenter.y, x2, y2, 0.75);

    console.log(innerCircleRadius, innerCircleRadius * offset);
    const circle = new Konva.Circle({
      x: coords.x,
      y: coords.y,
      fill: 'purple',
      radius: 5
    });

    this.layers.inner.nodes.add(circle).draw();
  }

  render() {
    
    this.drawImage('innerWheel', InnerWheel, this.layers.inner.wheel, () => {
      this.drawNode(0.75, 0.25);
    });

    handleDragEvents(this.stage);
    handleZoom(this.stage);

    return '';
  }
}

export default GatesOfFate;