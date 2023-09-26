export default class ComparisonDao {
  db: any
  type: string

  
  // @ts-ignore
  constructor(db, type: string) {
    this.db = db;
    this.type = type;
  }


  getAll() {
    return this.db.getAll(this.type);
  }

  get(id: string) {
    return this.db.get(this.type, id);
  }

  save(comparison: Comparison) {
    return this.db.save(this.type, comparison);
  }

  delete(id: string) {
    this.db.delete(this.type, id);
  }
}
