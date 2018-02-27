import Datamabase from '../../data/Datamabase.js';

test('test save new', () => {
  console.log('##### test save new');
  let drivetrains = [
    {gearRatios: [4.236, 1]},
    {gearRatios: [2.538, 1]},
  ];

  let comparison = {
    name: 'porsche',
    drivetrains: drivetrains,
  }

  let localStorage = new MockLocalStorage();
  let underTest = new Datamabase(localStorage);
  comparison = underTest.save(Datamabase.typeComparisons, comparison);
  expect(comparison.id).toBeDefined();

  let actualArray = JSON.parse(localStorage.getItem('COMPARISONS'));
  let actualMap = new Map(actualArray);
  expect(actualMap.size).toEqual(1);
  let actual = actualMap.values().next().value;
  expect(actual.id).toEqual(comparison.id);
  expect(actual.name).toEqual('porsche');
  expect(actual.drivetrains).toEqual(drivetrains);
});


test('test save existing', () => {
  console.log('##### test save existing');
  let drivetrains = [
    {gearRatios: [4.236, 1]},
    {gearRatios: [2.538, 1]},
  ];

  let comparison = {
    name: 'porsche',
    drivetrains: drivetrains,
  }

  let localStorage = new MockLocalStorage();
  let underTest = new Datamabase(localStorage);
  let stored = underTest.save(Datamabase.typeComparisons, comparison);

  stored.name = 'bmw';
  stored = underTest.save(Datamabase.typeComparisons, stored);

  // ID and drivetrains should stay the same, but name should be updated.
  let actual = underTest.get(Datamabase.typeComparisons, stored.id);
  expect(actual).toBeDefined();
  expect(actual.id).toEqual(stored.id);
  expect(actual.name).toEqual('bmw');
  expect(actual.drivetrains).toEqual(drivetrains);

  // Check for extaneous records...
  let array = JSON.parse(localStorage.getItem('COMPARISONS'));
  let map = new Map(array);
  expect(map.size).toEqual(1);
});


class MockLocalStorage {
  constructor() {
    this.store = {};
  }


  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};
