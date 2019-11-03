import React, { Component } from 'react';
import '../App.css';

export default class AxisForm extends Component {
  constructor(props) {
    super(props);
    this.state = props
  }


  render() {
    let onChange = this.handleInputChange;
    return (
      <form>
        <div>
          Max RPM: <input name="maxRpm" type="text" value={this.state.maxRpm} onChange={onChange} /><br />
          Max Speed (MPH): <input name="maxSpeed" type="text" value={this.state.maxSpeed} onChange={onChange} />
        </div>
      </form>
    );
  }


  handleInputChange = (event) => {
    let target = event.target;
    console.log('Updating ' + target.name + ' to: ' + target.value);

    this.setState({
      [target.name]: target.value,
    });

    if(target.name === 'maxRpm') {
      this.props.setMaxRpm(target.value)
    } else if(target.name === 'maxSpeed') {
      this.props.setMaxSpeed(target.value)
    }
  }
}
