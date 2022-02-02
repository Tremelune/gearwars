import React, { Component } from 'react';
import Form from './Form.js';
import Persistence from './Persistence.js';

class Comparison extends Component {
  constructor(props) {
    super(props);
    this.state = {comparison: props.comparison};
  }


  // todo Update: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({comparison: props.comparison});
  }


  render() {
    let comparison = this.state.comparison;
    return (
      <div className="comparisonForm">
        <Persistence comparison={comparison} hasSaved={this.props.hasSaved} setComparison={this.setComparison} />

        <div className="drivetrains">
          {comparison.drivetrains.map((drivetrain, index) =>
            <div className="drivetrain" key={index}>
              <div className="drivetrainTitle">
                <b>Drivetrain {index + 1}</b>
                <a onClick={(e) => this.duplicateDrivetrain(index)}>(duplicate)</a>
                {comparison.drivetrains.length > 1 &&
                  <a onClick={(e) => this.removeDrivetrain(index)}>(remove)</a>
                }
              </div>

              <Form id={index} drivetrain={drivetrain} update={this.setDrivetrain} />
            </div>
          )}
        </div>
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
