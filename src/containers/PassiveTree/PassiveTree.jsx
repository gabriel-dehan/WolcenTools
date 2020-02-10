import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import GateOfFates from 'lib/canvas/GateOfFates';

import {
  Scene,
  Fireflies,
  Canvas,
} from './PassiveTree.styles';

@inject('notificationStore')
@observer
class PassiveTree extends Component {
  constructor() {
    super();

    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.gof = new GateOfFates(this.canvas.current);
    this.gof.render();
  }

  turnWheel(direction) {
    console.log(direction);
    this.gof.rotate('inner', direction);
  }

  render() {

    return (
      <div>
        <h2>Passive Tree</h2>
        <button onClick={() => this.turnWheel('left')}>left</button>
        <button onClick={() => this.turnWheel('right')}>right</button>
        <Scene>
          <Fireflies id="fireflies" />
          <Canvas ref={this.canvas} id="gates_of_fate" />
        </Scene>
      </div>
    );
  }
}

export default PassiveTree;
