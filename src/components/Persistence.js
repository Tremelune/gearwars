import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class Persistence extends Component {
 /**
  * @param comparison The current comparison.
  * @function reloadSavedComparisons Refreshes comparison list.
  */
  constructor(props) {
    super(props);
    this.state = {name: props.comparison.name};
  }

  // todo Update: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({name: props.comparison.name});
  }


  render() {
    return (
      <form>
        <div>
          <b>Comparison</b>
          <button onClick={this.save}>Save</button><br/ >
          Name: <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
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


  save = (event) => {
    event.preventDefault();
    let comparison = this.props.comparison;
    comparison.name = this.state.name;
    locator.comparisonDao.save(comparison);
    this.props.reloadSavedComparisons(comparison.id);
  }
}
