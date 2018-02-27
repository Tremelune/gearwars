export default class ComparisonDao {
  constructor(db, type) {
    this.db = db;
    this.type = type;
  }


  getAll() {
    return this.db.getAll(this.type);
  }

  get(id) {
    return this.db.get(this.type, id);
  }

  save(comparison) {
    return this.db.save(this.type, comparison);
  }

  delete(id) {
    this.db.delete(this.type, id);
  }
}
