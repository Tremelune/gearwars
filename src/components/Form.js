import React, { Component } from 'react';
import '../App.css';
import * as Converter from '../biz/FormConverter.js';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = props.drivetrain; // Prepopulate form with values.

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // todo Process the form...
    let params = Converter.paramsFromDrivetrain(props.drivetrain);
    Converter.paramsToDrivetrain(params);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });


    // this.setState({
      // gearRatios:
    // })

    console.log(this.state);
  }

  handleSubmit(event) {
    console.log('State:');
    console.log(this.state);
    event.preventDefault();
    this.props.submit(this.toDrivetrain(event));
  }

  toDrivetrain(event) {
    return {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };
  }


  render() {
    let onChange = this.handleInputChange;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Tire Diameter: <input name="tireDiameter" type="text" value={this.state.tireDiameter} onChange={onChange} />
        </div>
        <div>
          Final Drive: <input name="finalDrive" type="text" value={this.state.finalDrive} onChange={onChange} />
        </div>
        <div>Redline: <input name="redline" type="text" value={this.state.redline} onChange={onChange} /></div>

        <div>First: <input name="first" type="text" value={this.state.first} onChange={onChange} /></div>
        <div>Second: <input name="second" type="text" value={this.state.second} onChange={onChange} /></div>
        <div>Third: <input name="third" type="text" value={this.state.third} onChange={onChange} /></div>
        <div>Fourth: <input name="fourth" type="text" value={this.state.fourth} onChange={onChange} /></div>
        <div>Fifth: <input name="fifth" type="text" value={this.state.fifth} onChange={onChange} /></div>
        <div>Sixth: <input name="sixth" type="text" value={this.state.sixth} onChange={onChange} /></div>
        <div>Seventh: <input name="seventh" type="text" value={this.state.seventh} onChange={onChange} /></div>
        <div>Eight: <input name="eight" type="text" value={this.state.eight} onChange={onChange} /></div>
        <div>Ninth: <input name="ninth" type="text" value={this.state.ninth} onChange={onChange} /></div>
        <div>Tenth: <input name="tenth" type="text" value={this.state.tenth} onChange={onChange} /></div>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
