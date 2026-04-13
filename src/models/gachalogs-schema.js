module.exports = (db) =>
  db.model(
    'GachaLogs',
    db.Schema({
      userId: {
        type: db.Schema.Types.ObjectId,
        ref: "Users"
      },
      reward: {
        type: String,
        default: null,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    })
  );