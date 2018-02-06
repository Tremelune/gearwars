import React, { Component } from 'react';
import '../App.css';
import * as Calculator from '../biz/GearingCalculator.js';
import * as Converter from '../biz/FormConverter.js';

class TireForm extends Component {
  constructor(props) {
    super(props);

    let size = '235/45-17'; // props
    let tire = Converter.parseTire(size);
    console.log("tire:", tire);
    let diameter = Calculator.diameter(tire);

    this.state = {size: size, diameter: diameter} // Prepopulate form with values.

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  render() {
    return (
      <div>
        <form classname={'Form'}>
          <div>
            Tire size (example: 235/45-17):
            <input name="size" type="text" value={this.state.size} onChange={this.handleInputChange} />

          </div>
        </form>

        <div>Diameter: {this.state.diameter}</div>
      </div>
    );
  }

  handleInputChange(event) {
    let target = event.target;
    let diameter = Calculator.diameter(target.value);

    this.setState({
      size: target.value,
      diameter: diameter,
    });
  }
}

export default TireForm;
