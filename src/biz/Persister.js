const KEY = "drivetrains";

/**
 * These could be static functions, but there's something about accessing persistent storage from a static that rubs
 * me the wrong way...so we're gonna require instantiation.
 *
 * When this project grows, this should be put somewhere distinct from business logic, as it is more of a data/resource
 * class that shouldn't have business logic.
 */
export default class Persister {
  clear() {
    console.log("Clearing local storage...");
    localStorage.clear();
  }

  load() {
    let comparison = JSON.parse(localStorage.getItem(KEY));
    console.log("Loading:", comparison);
    return comparison;
  }

  save(comparison) {
    console.log("Saving:", comparison);
    localStorage.setItem(KEY, JSON.stringify(comparison));
  }
}
