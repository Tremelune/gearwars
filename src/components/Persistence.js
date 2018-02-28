import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class Persistence extends Component {
 /**
  * Props:
  * @param comparison The current comparison.
  */
  constructor(props) {
    super(props);
    this.state = {name: props.comparison.name};
  }


  componentWillReceiveProps(props) {
    this.setState({name: props.comparison.name});
  }


  render() {
    return (
      <form>
        <div>
          <b>Comparison:</b>
          <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
          <button onClick={this.save}>Rename</button>
        </div>
      </form>
    );
  }


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }


  save = () => {
    let comparison = this.props.comparison;
    comparison.name = this.state.name;
    locator.comparisonDao.save(comparison);
  }
}
