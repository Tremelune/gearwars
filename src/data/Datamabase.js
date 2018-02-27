/** External type for specifiying object type. */
export const TYPE_COMPARISONS = "comparisons";

/** Internal map key for storing comparisons. */
const KEY_COMPARISONS = "COMPARISONS";

let comparisons = new Map([]);
// Don't use external values for internal implementation details. It's worth the explicit conversion.
let typesToKeys = new Map([[TYPE_COMPARISONS, KEY_COMPARISONS]])
let keysToTables = new Map([[KEY_COMPARISONS, comparisons]])

/**
 * This is a fake database. If it gets any more complex, we'll need a real database, so I figured it would make sense to
 * mimic one in the meantime. This stores everything in a series of maps. Loading loads one into memory and
 * iterates through it to find stuff. Don't...ever do this...
 */
export default class Datamabase {
  // Hm. https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
  static get typeComparisons() {
    return TYPE_COMPARISONS;
  }


  constructor(localStorage) {
    this.localStorage = localStorage;

    // Due to the lack of class-member variables in ES6, I'm forced to declare a few things in the module, but that
    // makes them essentially public static globals, which is terrifying. The best I can do is clear them here...
    comparisons.clear();
  }


 /** @return Unordered array of TYPE_COMPARISONS. */
  getAll(type) {
    let values = this.typeToTable(type).values()
    return Array.from(values);
  }

 /** @return Entity of type with id. */
  get(type, id) {
    console.log('Getting from ' + type + ' with ID: ' + id);
    let table = this.typeToTable(type);
    return table.get(id);
  }

 /**
  * Stores entity in type table, using existing ID or with a newly generated ID (that is added to the passed-in
  * entity).
  */
  save(type, entity) {
    console.log('Saving ' + type + ' with ID:', entity.id);
    let id = entity.id ? entity.id : this.generateId(); // Keep the existing ID, or roll one if this is a new entity.
    entity.id = id;
    this.typeToTable(type).set(id, entity);
    this.storeTable(type);
    return entity;
  }

 /** Deletes entity of type with id. */
  delete(type, id) {
    console.log('Deleting ' + type + ' with ID: ' + id);
    this.typeToTable(type).delete(id);
    this.storeTable(type);
  }


 /** Clears entire database. For testing only... */
  clear() {
    console.log('Clearing local storage...');
    this.localStorage.clear();
  }


  storeTable(type) {
    let entries = this.typeToTable(type).entries();
    let array = Array.from(entries);
    let key = this.typeToKey(type);
    this.localStorage.setItem(key, JSON.stringify(array));

    // To avoid dealing with sync, just blow out the table and reload it any time changes are made. Yes, this is ham-
    // fisted, but this whole class is (presumably) temporary until the app needs a real datastore.
    this.refreshTable(key);
  }

  // Loads the whole table from localstorage.
  refreshTable(key) {
    let results = this.localStorage.getItem(key)
    let resultsArray = JSON.parse(results);
    let table = this.keyToTable(key);
    table.clear();
    for(let result of resultsArray) {
      table.set(result[0], result[1]);
    }
  }


  typeToTable(type) {
    let key = this.typeToKey(type);
    return this.keyToTable(key);
  }

  typeToKey(type) {
    let key = typesToKeys.get(type);
    if(!key) {
      throw 'No key found for type: ' + type;
    }
    return key;
  }

  keyToTable(key) {
    let table = keysToTables.get(key);
    if(!table) {
      throw 'No table found for type: ' + key;
    }
    return table;
  }

  // "UUID" generator from: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
