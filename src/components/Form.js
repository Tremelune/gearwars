import React, { Component } from 'react';
import '../App.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {}; // Avoid null, 'cause we gotta append shit in the form.

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
    console.log(this.state);
  }

  handleSubmit(event) {
    console.log('State:');
    console.log(this.state);
    event.preventDefault();
    this.props.toggle();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>First: <input name="first" type="text" value={this.state.first} onChange={this.handleInputChange} /></div>
        <div>Second: <input name="second" type="text" value={this.state.second} onChange={this.handleInputChange} /></div>
        <div>Third: <input name="third" type="text" value={this.state.third} onChange={this.handleInputChange} /></div>
        <div>Fourth: <input name="fourth" type="text" value={this.state.fourth} onChange={this.handleInputChange} /></div>
        <div>Fifth: <input name="fifth" type="text" value={this.state.fifth} onChange={this.handleInputChange} /></div>
        <div>Sixth: <input name="sixth" type="text" value={this.state.sixth} onChange={this.handleInputChange} /></div>
        <div>Seventh: <input name="seventh" type="text" value={this.state.seventh} onChange={this.handleInputChange} /></div>
        <div>Eight: <input name="eight" type="text" value={this.state.eight} onChange={this.handleInputChange} /></div>
        <div>Ninth: <input name="ninth" type="text" value={this.state.ninth} onChange={this.handleInputChange} /></div>
        <div>Tenth: <input name="tenth" type="text" value={this.state.tenth} onChange={this.handleInputChange} /></div>

        <input type="submit" value="Toggle" />
      </form>
    );
  }
}

export default Form;
