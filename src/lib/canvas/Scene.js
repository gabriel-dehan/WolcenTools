import Konva from 'konva';
import { Config, dragBoundFunc, handleDragEvents, handleZoom } from './utils';

export default class {
  constructor(container) {
    const { width, height } = Config;

    this.stage = new Konva.Stage({
      container: container.id, 
      draggable: true,
      width,
      height,
      dragBoundFunc,
    });

    this.defaultLayerOptions = {
      width: this.stage.width(),
      height: this.stage.height(),
      x: this.center.x,
      y: this.center.y,
      offsetX: this.center.x,
      offsetY: this.center.y,
    }

    this.layers = {
      background: new Konva.Layer(this.defaultLayerOptions),
    }

    this.stage.add(this.layers.background);

    handleDragEvents(this.stage);
    handleZoom(this.stage);
  }  

  batchDraw() { return this.stage.batchDraw(); }

  addLayers(layers) {
    layers.map(layer => this.stage.add(layer));
  }

  get center() {
    return {
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
    }
  }

  drawImage(name, imagePath, layer, cb) {
    Konva.Image.fromURL(imagePath, (image) => {
      image.setAttrs({
        x: this.center.x,
        y: this.center.y,
        scaleX: 0.4,
        scaleY: 0.4,
        offsetX: image.attrs.image.naturalWidth / 2,
        offsetY: image.attrs.image.naturalHeight / 2,
      });

      layer.add(image);
      layer.batchDraw();
      
      cb(image)      
    });
  }

}