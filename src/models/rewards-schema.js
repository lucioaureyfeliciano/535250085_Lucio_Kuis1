module.exports = (db) =>
  db.model(
    'Rewards',
    db.Schema({
      name: String,
      quota: Number,
      claimed: {
        type: Number,
        default: 0,
      },
      remaining: {
        type: Number,
        default: 0
      },
    })
  );