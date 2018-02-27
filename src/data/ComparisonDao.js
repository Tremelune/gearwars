export default class ComparisonDao {
  constructor(db, type) {
    this.db = db;
    this.type = type;
  }


  getAllComparisons() {
    return this.db.getAll(this.type);
  }

  getComparison(id) {
    return this.db.get(this.type, id);
  }

  saveComparison(comparison) {
    return this.db.save(this.type, comparison);
  }

  deleteComparison(id) {
    this.db.delete(this.type, id);
  }
}
