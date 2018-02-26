import React, { Component } from 'react';
import Form from './Form.js';
import Persistence from './Persistence.js';
import locator from '../biz/Locator.js';

class Comparison extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      drivetrains: props.drivetrains,
      setDrivetrains: props.setDrivetrains,
    }
  }


  render() {
    // Don't show the (Remove) button if there's only one listed drivetrain.
    let removeButtonText = this.state.drivetrains.length > 1 ? "(Remove)" : "";
    return (
      <div>
        {this.state.drivetrains.map((drivetrain, index) =>
          <div key={index}>
            <div className="drivetrainTitle">
              <b>Drivetrain {index + 1}</b>
              <a onClick={(e) => this.duplicateDrivetrain(index)}>(Duplicate)</a>
              <a onClick={(e) => this.removeDrivetrain(index)}>{removeButtonText}</a>
            </div>

            <Form id={index} drivetrain={drivetrain} update={this.setDrivetrain} />
            <br />
          </div>
        )}

        <Persistence drivetrains={this.state.drivetrains} setDrivetrains={this.setDrivetrains} />
      </div>
    );
  }


  duplicateDrivetrain = (index) => {
    let drivetrains = this.state.drivetrains.slice();
    let drivetrain = drivetrains[index];
    drivetrains.push(drivetrain);
    this.setDrivetrains(drivetrains);
  }

  removeDrivetrain = (index) => {
    let drivetrains = this.state.drivetrains.slice();
    drivetrains.splice(index, 1);
    this.setDrivetrains(drivetrains);
  }

  setDrivetrain = (formId, drivetrain) => {
    // We have several drivetrains in state, so we use the form ID to replace just the one being updated.
    let drivetrains = this.state.drivetrains.slice();
    drivetrains[formId] = drivetrain;
    this.setDrivetrains(drivetrains);
  }


  setDrivetrains = (drivetrains) => {
    this.setState({drivetrains: drivetrains});
    this.state.setDrivetrains(drivetrains);
  }
}

export default Comparison;
