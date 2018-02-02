import React, { Component } from 'react';
import '../App.css';
import * as Converter from '../biz/FormConverter.js';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = Converter.paramsFromDrivetrain(props.drivetrain); // Prepopulate form with values.

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // setState isn't immediate, so throw a callback in to update the chart when ready.
    let updateChart = () => {
      console.log('Input change state:', this.state);
      let drivetrain = Converter.paramsToDrivetrain(this.state);
      console.log('Input change drivetrain:', drivetrain);
      this.props.update(drivetrain);
    }

    this.setState(
      {[name]: value},
      updateChart
    );
  }


  render() {
    let onChange = this.handleInputChange;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Tire Diameter: <input name="tireDiameter" type="number" value={this.state.tireDiameter} onChange={onChange} />
        </div>
        <div>
          Final Drive: <input name="finalDrive" type="number" value={this.state.finalDrive} onChange={onChange} />
        </div>
        <div>Redline: <input name="redline" type="number" value={this.state.redline} onChange={onChange} /></div>
        <br />

        {/* todo Make number of gears mutable. Some cars have like TEN... */}
        <div>Gear Ratios</div>
        <div>First: <input name="gear0" type="number" value={this.state.gear0} onChange={onChange} /></div>
        <div>Second: <input name="gear1" type="number" value={this.state.gear1} onChange={onChange} /></div>
        <div>Third: <input name="gear2" type="number" value={this.state.gear2} onChange={onChange} /></div>
        <div>Fourth: <input name="gear3" type="number" value={this.state.gear3} onChange={onChange} /></div>
        <div>Fifth: <input name="gear4" type="number" value={this.state.gear4} onChange={onChange} /></div>
        <div>Sixth: <input name="gear5" type="number" value={this.state.gear5} onChange={onChange} /></div>
      </form>
    );
  }
}

export default Form;
