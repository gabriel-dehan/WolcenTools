import Konva from 'konva';
import { movePointAlongMatrix } from './utils';

import InnerWheel from 'assets/images/wheel_inner.png';

/* 
 * NOTES: 
 *  - In Wolcen circle Sections are counted from 0 to x clockwise, with the "baseline" (used for calculating angles) of each section being the line opening the section clockwise.
 *  - All trees nodes come with a "percentage" angle (percentAngle) that is positioned relative to its wheel section's size.
 *    This means that an angle of 0.25 for a section of the inner wheel which has 3 sections = 120deg sections, equates to 25% of 120 = 30deg. The actual angle from the sections 'baseline'
 */
export default class {
  constructor(props) {
    this.type = props.type;
    this.scene = props.scene;
    this.renderedWheel = null;
    this.sections = [{ order: 0, }, { order: 1 }, { order: 2 }];
    
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
    if (this.type === 'inner') {
      return {
        image: InnerWheel,
        sections: this.sections.length,
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
    return (this.renderedWheel.width() - 60) * this.renderedWheel.attrs.scaleX;
  }

  get radius() {
    return this.diameter / 2;
  }

  get radialXAxisVector() {
    return {
      x: this.scene.center.x + this.radius, 
      y: this.scene.center.y,
    }
  }

  get radialYAxisVector() {
    return {
      x: this.scene.center.x,
      y: this.scene.center.y + this.radius,
    }
  }

  get sectionAngle() {
    return 360 / this.props.sections;
  }

  get sectionsStartAngles() {
    // All wheels first section actually start at angle -90 as they are all vertically aligned
    const globalAngleOffset = -90;
    return this.sections.map(section => {
      // 1 -> -90, 2:
      return globalAngleOffset + (this.sectionAngle * section.order)
    })
  }

  coordsFromOriginForAngle(originVector, angle) {
    return { 
      x: originVector.x + this.radius * Math.cos(angle * Math.PI / 180),
      y: originVector.y + this.radius * Math.sin(angle * Math.PI / 180)
    }
  }

  getAngleRelativeToSection(percentAngle, section) {
    const angle = percentAngle * this.sectionAngle;
    // The start is angle 0 so we need to find the new start 
    console.log(angle, this.sectionsStartAngles[section.order])
    return angle + this.sectionsStartAngles[section.order];
  }

  
  placeNode(percentAngle, position, section) {
    /*
     * If inner circle, then 3 sections each 120deg
     * 0.25 (angle %) * 120 = 30
     * Need to take vector and add angle
     */
    const relativeAngle = this.getAngleRelativeToSection(percentAngle, section);
    // Computed using: (𝑥2,𝑦2)=(𝑥1+𝑙⋅cos(𝑎),𝑦1+𝑙⋅sin(𝑎))
    const angleVector = this.coordsFromOriginForAngle(this.scene.center, relativeAngle);
    const coords = movePointAlongMatrix(this.scene.center, angleVector, position);
    
    this.drawDebugSections('purple');
    this.drawDebugLine('red', this.scene.center, this.radialXAxisVector);
    this.drawDebugLine('green', this.scene.center, angleVector);
    
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

  renderTree(tree, section) {
    tree.forEach(node => {
      this.placeNode(node.angle, node.position, section);
    })
  }

  drawDebugSections(color) {
    this.sectionsStartAngles.forEach(sectionAngle => {
      let angleV = this.coordsFromOriginForAngle(this.scene.center, sectionAngle);
      this.drawDebugLine(color, this.scene.center, angleV);
    });
  }

  drawDebugLine(color, vector1, vector2) {
    var line = new Konva.Line({
      points: [vector1.x, vector1.y, vector2.x, vector2.y],
      stroke: color,
      strokeWidth: 2,
      lineJoin: 'round'
    }); 
    this.layers.nodes.add(line).draw();
  }

  draw() {
    const { image } = this.props;
     
    this.scene.drawImage('InnerWheel', image, this.layers.wheel, (renderedImage) => {
      this.renderedWheel = renderedImage;
      
      const tree = [
        {
          name: "HARDY",
          description: "",
          flavor: "",
          angle: 0.25,
          position: 0.25,
          rarity: 1,
        }
      ]
      this.renderTree(tree, this.sections[1]);
    });

  }
}