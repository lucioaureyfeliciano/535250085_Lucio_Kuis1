const gachaRepository = require('./gacha-repository');

async function gacha(userId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Hitung jumlah gacha hari ini
  const totalToday = await gachaRepository.countUserGachaToday(userId, today);

  if (totalToday >= 5) {
    return {
      message: 'Batas gacha harian (5x) tercapai',
      reward: null,
    };
  }

  const rewards = await gachaRepository.getAvailableRewards();

  if (rewards.length === 0) {
    await gachaRepository.createGachaLog(userId, null);

    return {
      message: 'Tidak ada reward tersedia saat ini',
      reward: null,
    };
  }
  let winReward = null;

  // Random (30% chance menang)
  const isWin = Math.random() <= 0.3;

  if (isWin) {
    const randomIndex = Math.floor(Math.random() * rewards.length);
    winReward = rewards[randomIndex];

    await gachaRepository.incrementRewardClaimed(winReward._id);
  }

  await gachaRepository.createGachaLog(
    userId,
    winReward ? winReward.name : null
  );

  return {
    message: winReward ? 'Selamat kamu menang!' : 'Belum beruntung',
    reward: winReward ? winReward.name : null,
  };
}

async function getRewards() {
  const rewards = await gachaRepository.getAllRewards();

  const result = rewards.map((reward) => ({
    id: reward._id,
    name: reward.name,
    quota: reward.quota,
    claimed: reward.claimed,
    remaining: reward.quota - reward.claimed,
  }));

  return result;
}

async function createReward(name, quota) {
  const reward = await gachaRepository.createReward(name, quota);

  return !!reward;
}

async function getAllLogs() {
  const logs = await gachaRepository.getAllLogs();

  return logs;
}

async function getUserLogs(userId) {
  const logs = await gachaRepository.getUserLogs(userId);

  return logs;
}

function maskName(name) {
  if (!name || typeof name !== 'string') return '';

  return name
    .trim()
    .split(/\s+/)
    .map((word) => {
      const chars = word.split('');
      const len = chars.length;

      // jumlah karakter yang mau di-mask = 50% panjang kata
      const maskCount = Math.floor(len / 2);

      const indexes = new Set();

      // pilih index random sebanyak maskCount
      while (indexes.size < maskCount) {
        const randomIndex = Math.floor(Math.random() * len);
        indexes.add(randomIndex);
      }

      // apply masking
      return chars.map((char, i) => (indexes.has(i) ? '*' : char)).join('');
    })
    .join(' ');
}

async function getWinners() {
  const logs = await gachaRepository.getWinningLogs();

  const result = {};

  logs.forEach((log) => {
    const { reward } = log;
    const userName = log.userId?.fullName;

    if (!result[reward]) {
      result[reward] = [];
    }

    result[reward].push(maskName(userName));
  });

  return result;
}

module.exports = {
  gacha,
  getUserLogs,
  getAllLogs,
  getRewards,
  createReward,
  getWinners,
};
