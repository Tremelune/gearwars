const KEY_COMPARISONS = "comparisons";

/**
 * This is a fake database. If it gets any more complex, we'll need a real database, so I figured it would make sense to
 * mimic one in the meantime. This stores everything in a series of maps. Loading loads one into memory and
 * iterates through it to find stuff. Don't...ever do this...
 *
 * When this project grows, this should be put somewhere distinct from business logic, as it is more of a data/resource
 * class that shouldn't have business logic.
 */
let comparisons = new Map([]);

export default class Persister {
  clear() {
    console.log("Clearing local storage...");
    localStorage.clear();
  }

 /** @return Unordered array of comparisons. */
  getAllComparisons() {
   return Array.from(comparisons.values());
  }

  getComparison(name) {
   console.log("Getting comparison:", name);
   return comparisons.get(name);
  }

  saveComparison(comparison) {
    console.log("Saving:", comparison);
    comparisons.set(comparison.name, comparison);
    this.storeDatabase();
  }


  storeDatabase() {
    console.log("Saving comparisons:", comparisons);
    let comparisonArray = Array.from(comparisons.entries());
    console.log("Setting:", comparisonArray);
    localStorage.setItem(KEY_COMPARISONS, JSON.stringify(comparisonArray));

    // To avoid dealing with sync, just blow out the database and reload it any time changes are made. Yes, this is ham-
    // fisted, but this whole class is (presumably) temporary until the app needs a real datastore.
    this.refreshDatabase();
  }

  // Loads the whole database from localstorage.
  refreshDatabase() {
    console.log("Refreshing database...");
    let comparisonArray = JSON.parse(localStorage.getItem(KEY_COMPARISONS));
    comparisons = new Map(comparisonArray);

    console.log("Loaded comparisons:", comparisons);
  }
}
