const { Rewards, GachaLogs } = require('../../../models');

async function getAllRewards() {
  return Rewards.find({});
}

async function createReward(name, quota) {
  return Rewards.create({
    name,
    quota,
    claimed: 0, 
  });
}

async function getAvailableRewards() {
  return Rewards.find({
    $expr: { $lt: ["$claimed", "$quota"] },
  });
}

async function incrementRewardClaimed(rewardId) {
  return Rewards.updateOne(
    { _id: rewardId },
    { $inc: { claimed: 1 } }
  );
}

async function countUserGachaToday(userId, today) {
  return GachaLogs.countDocuments({
    userId,
    createdAt: { $gte: today },
  });
}

async function createGachaLog(userId, reward) {
  return GachaLogs.create({
    userId,
    reward,
  });
}

async function getAllLogs() {
  return GachaLogs.find({}).sort({ createdAt: -1 });
}

async function getUserLogs(userId) {
  return GachaLogs.find({ userId }).sort({ createdAt: -1 });
}

async function getWinningLogs() {
  return GachaLogs.find({ reward: { $ne: null } })
    .populate("userId", "fullName"); // ambil field name saja
}

module.exports = {
  getAllRewards,
  createReward,
  getAvailableRewards,
  incrementRewardClaimed,
  countUserGachaToday,
  createGachaLog,
  getAllLogs,
  getUserLogs,
  getWinningLogs,
};