const KEY = "drivetrains";

/**
 * These could be static functions, but there's something about accessing persistent storage from a static that rubs
 * me the wrong way...So we're gonna require instantiation. I'm a hair away from writing a service locator to inject
 * singleton dependencies...
 *
 * When this project grows, this should be put somewhere distinct from business logic, as it is more of a data/resource
 * class that shouldn't have business logic.
 */
class Persister {
  clear() {
    console.log("Clearing local storage...");
    localStorage.clear();
  }

  load() {
    let drivetrains = JSON.parse(localStorage.getItem(KEY));
    console.log("Loading:", drivetrains);
    return drivetrains;
  }

  save(drivetrains) {
    console.log("Saving:", drivetrains);
    localStorage.setItem(KEY, JSON.stringify(drivetrains));
  }
}

export default Persister;
