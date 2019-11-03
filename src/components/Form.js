import React, { Component } from 'react';
import '../App.css';
import FormConverter from '../biz/FormConverter.js';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }


  // todo Update: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(props) {
    this.setState(this.stateFromProps(props));
  }


  render() {
    let onChange = this.handleInputChange;
    // todo Validate sane values.
    return (
      <form>
        <div>
          Name: <input name="name" type="text" value={this.state.name} onChange={onChange} />
        </div>
        <div>
          Tire Diameter: <input name="tireDiameter" type="number" value={this.state.tireDiameter} onChange={onChange} />
        </div>
        <div>
          Final Drive: <input name="finalDrive" type="number" value={this.state.finalDrive} onChange={onChange} />
        </div>
        <div>Redline: <input name="redline" type="number" value={this.state.redline} onChange={onChange} /></div>

        {/* todo Make number of gears mutable. Some cars have like TEN... */}
        <div>Gear Ratios</div>
        <div>First: <input name="gear0" type="number" value={this.state.gear0} onChange={onChange} /></div>
        <div>Second: <input name="gear1" type="number" value={this.state.gear1} onChange={onChange} /></div>
        <div>Third: <input name="gear2" type="number" value={this.state.gear2} onChange={onChange} /></div>
        <div>Fourth: <input name="gear3" type="number" value={this.state.gear3} onChange={onChange} /></div>
        <div>Fifth: <input name="gear4" type="number" value={this.state.gear4} onChange={onChange} /></div>
        <div>Sixth: <input name="gear5" type="number" value={this.state.gear5} onChange={onChange} /></div>
        <div>Seventh: <input name="gear6" type="number" value={this.state.gear6} onChange={onChange} /></div>
      </form>
    );
  }


  // Prepopulate form with values.
  stateFromProps(props) {
    return FormConverter.paramsFromDrivetrain(props.drivetrain);
  }


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // setState isn't immediate, so throw a callback in to update the chart when ready.
    let updateChart = () => {
      let drivetrain = FormConverter.paramsToDrivetrain(this.state);
      this.props.update(this.props.id, drivetrain);
    }

    this.setState(
      {[name]: value},
      updateChart
    );
  }
}
