import Konva from 'konva';
import AnimateFireflies from 'vendor/fireflies';

import { movePointAlongMatrix } from 'helpers/canvas';

import Scene from './Scene';
import Wheel from './Wheel';

class GatesOfFate {
  constructor(container) {
    AnimateFireflies({ number_flies: 100, color: "#fff", elem: `#fireflies` });

    this.scene = new Scene(container);

    this.wheels = {
      inner: new Wheel({ type: 'inner', scene: this.scene }),
      middle: null,
      outer: null,
    }

    this.scene.addLayers([
      this.wheels.inner.layers.wheel,
      this.wheels.inner.layers.circuit,
      this.wheels.inner.layers.nodes,
    ]);
  }

  rotate(wheel, direction) {
    this.wheels[wheel].rotate(direction);
  }

  render() {
    
    this.wheels.inner.draw();
   
    return '';
  }
}

export default GatesOfFate;