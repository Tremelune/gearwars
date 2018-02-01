import React, { Component } from 'react';
import '../App.css';
import * as Converter from '../biz/FormConverter.js';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = Converter.paramsFromDrivetrain(props.drivetrain); // Prepopulate form with values.

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log('Input change state:', this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submit state:', this.state);
    let drivetrain = Converter.paramsToDrivetrain(this.state);
    console.log('Submit drivetrain:', drivetrain);
    this.props.submit(drivetrain);
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
        <br />
        
        {/* todo Make number of gears mutable. Some cars have like TEN... */}
        <div>First: <input name="gear0" type="text" value={this.state.gear0} onChange={onChange} /></div>
        <div>Second: <input name="gear1" type="text" value={this.state.gear1} onChange={onChange} /></div>
        <div>Third: <input name="gear2" type="text" value={this.state.gear2} onChange={onChange} /></div>
        <div>Fourth: <input name="gear3" type="text" value={this.state.gear3} onChange={onChange} /></div>
        <div>Fifth: <input name="gear4" type="text" value={this.state.gear4} onChange={onChange} /></div>
        <div>Sixth: <input name="gear5" type="text" value={this.state.gear5} onChange={onChange} /></div>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
