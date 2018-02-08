const KEY = "drivetrains";


export function clear() {
  console.log("Clearing local storage...");
  localStorage.clear();
}

export function load() {
  let drivetrains = JSON.parse(localStorage.getItem(KEY));
  console.log("Loading:", drivetrains);
  return drivetrains;
}

export function save(drivetrains) {
  console.log("Saving:", drivetrains);
  localStorage.setItem(KEY, JSON.stringify(drivetrains));
}
