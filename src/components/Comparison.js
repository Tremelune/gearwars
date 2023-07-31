import React, { Component } from 'react';
import locator from '../biz/Locator.js';
import Form from './Form.js';
import Persistence from './Persistence.js';
import { HexColorPicker } from "react-colorful";

class Comparison extends Component {
  /**
   * @param comparison Comparison to display.
   * @function setComparison Sets the comparison to display.
   * @function reloadSavedComparisons Reloads comparison list.
   */
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
        <Persistence
          comparison={comparison}
          hasSaved={this.props.hasSaved}
          setComparison={this.setComparison}
          reloadSavedComparisons={this.props.reloadSavedComparisons}/>

        <div className="drivetrains">
          {comparison.drivetrains.map((drivetrain, index) => {
            let color = this.findColor(drivetrain, index);
            let style = {color: color}; // The first color is the "real" one.
            let hidden = drivetrain.hidden == true;

            return (
              <div className="drivetrain" key={index}>
                <div className="drivetrainTitle">
                  <b style={style}>Drivetrain {index + 1}</b>
                  <a onClick={(e) => this.duplicateDrivetrain(index)}>(duplicate)</a>
                  {comparison.drivetrains.length > 1 &&
                    <a onClick={(e) => this.removeDrivetrain(index)}>(remove)</a>
                  }
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={hidden}
                    onChange={(e) => this.toggleVisibility(index)}/>
                  Hidden
                </div>

                <Form id={index} drivetrain={drivetrain} update={this.setDrivetrain} />
                <HexColorPicker color={color} onChange={(color) => this.setColor(color, drivetrain)} />
              </div>
            )
          })}
        </div>
      </div>
    );
  }


  /**
   * Finds color for a drivetrain. If no color has been manually assigned, it will generate one.
   * 
   * @param drivetrain Drivetrain to determine the color for.
   * @param index Index of drivetrain in the list of comparisons for this component.
   * @returns Hex value of color: "ff004a"
   */
  findColor = (drivetrain, index) => {
    if(drivetrain.color) {
      return drivetrain.color;
    } else {
      let colors = locator.lineColoration.generateGradient(index, 1);
      // We have a gradient, so choose the "primary" color...which is the first.
      return colors[0];
    }
  }

  // Callback for color picker.
  setColor = (color, drivetrain) => {
    drivetrain.color = color;
    // Update comparisons...Gotta be a better way to do this...
    let comparison = this.state.comparison;
    this.setComparison(comparison)
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

  toggleVisibility = (index) => {
    let comparison = this.state.comparison;
    let drivetrain = comparison.drivetrains[index];
    drivetrain.hidden = !drivetrain.hidden;
    this.setComparison(comparison);
  }


  /** Triggers a re-draw */
  setComparison = (comparison) => {
    this.setState({comparison: comparison});
    this.props.setComparison(comparison);
  }
}

export default Comparison;
