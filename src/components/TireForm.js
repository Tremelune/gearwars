import React, { Component } from 'react';
import '../App.css';
import FormConverter from '../biz/FormConverter.js';
import GearingCalculator from '../biz/GearingCalculator.js';

class TireForm extends Component {
  /** @params props: Tire size, ex: {tireSize: '235/45-17'}; */
  constructor(props) {
    super(props);

    let diameter = this.diameterFromSize(props.tireSize);

    this.state = {size: props.tireSize, diameter: diameter} // Prepopulate form with values.

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  render() {
    return (
      <div>
        <form>
            Tire size:
            <input name="size" type="text" value={this.state.size} onChange={this.handleInputChange} />
        </form>

        Diameter: {this.state.diameter}
      </div>
    );
  }

  handleInputChange(event) {
    let target = event.target;
    let diameter = this.diameterFromSize(target.value)

    this.setState({
      size: target.value,
      diameter: diameter,
    });
  }

  diameterFromSize(size) {
    // If we can't parse/calculate a diameter, it's because of bad input. C'est cool.
    try {
      let tire = FormConverter.parseTire(size);
      return GearingCalculator.diameter(tire);
    } catch(e) {
      return 0;
    }
  }
}

export default TireForm;
