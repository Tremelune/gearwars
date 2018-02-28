import React, { Component } from 'react';
import Form from './Form.js';
import Persistence from './Persistence.js';

class Comparison extends Component {
  constructor(props) {
    super(props);
    this.state = {comparison: props.comparison};
  }


  componentWillReceiveProps(props) {
    this.setState({comparison: props.comparison});
  }


  render() {
    // Don't show the (Remove) button if there's only one listed drivetrain.
    let comparison = this.state.comparison;
    let removeButtonText = comparison.drivetrains.length > 1 ? "(remove)" : "";
    
    return (
      <div>
        <Persistence comparison={comparison} hasSaved={this.props.hasSaved} setComparison={this.setComparison} />

        {comparison.drivetrains.map((drivetrain, index) =>
          <div key={index}>
            <div className="drivetrainTitle">
              <b>Drivetrain {index + 1}</b>
              <a onClick={(e) => this.duplicateDrivetrain(index)}>(duplicate)</a>
              <a onClick={(e) => this.removeDrivetrain(index)}>{removeButtonText}</a>
            </div>

            <Form id={index} drivetrain={drivetrain} update={this.setDrivetrain} />
            <br />
          </div>
        )}
      </div>
    );
  }


  // Prolly time for some closures down here to remove dupe code...
  duplicateDrivetrain = (index) => {
    let comparison = this.state.comparison;
    let drivetrains = comparison.drivetrains.slice();
    let drivetrain = drivetrains[index];
    drivetrains.push(drivetrain);
    comparison.drivetrains = drivetrains;
    this.setComparison(comparison);
  }

  removeDrivetrain = (index) => {
    let comparison = this.state.comparison;
    let drivetrains = comparison.drivetrains.slice();
    drivetrains.splice(index, 1);
    comparison.drivetrains = drivetrains;
    this.setComparison(comparison);
  }

  setDrivetrain = (formId, drivetrain) => {
    // We have several drivetrains in state, so we use the form ID to replace just the one being updated.
    let comparison = this.state.comparison;
    let drivetrains = comparison.drivetrains.slice();
    drivetrains[formId] = drivetrain;
    comparison.drivetrains = drivetrains;
    this.setComparison(comparison);
  }


  setComparison = (comparison) => {
    this.setState({comparison: comparison});
    this.props.setComparison(comparison);
  }
}

export default Comparison;
