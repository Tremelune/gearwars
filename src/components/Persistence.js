import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default function Persistence(comparison, reload) {
  const [name, setName] = useState(comparison.name)

  function save(event) {
    event.preventDefault();
    comparison.name = name;
    locator.comparisonDao.save(comparison);
    reload(comparison.id);
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setName(value);
  }

  return (
    <form>
      <div>
        <b>Comparison</b>
        <button onClick={save}>Save</button><br/ >
        Name: <input name="name" type="text" value={name} onChange={handleInputChange} />
      </div>
    </form>
  );
}
