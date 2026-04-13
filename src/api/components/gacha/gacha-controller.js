const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');


async function gacha(request, response, next) {
  try {
    const { userId } = request.body;

    // userId wajib
    if (!userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'userId is required'
      );
    }

    const result = await gachaService.gacha(userId);

    if (!result) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to perform gacha'
      );
    }

    return response.status(200).json(result);

  } catch (error) {
    return next(error);
  }
}

async function getRewards(request, response, next) {
  try {
    const rewards = await gachaService.getRewards();

    if (!rewards) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to get rewards'
      );
    }

    return response.status(200).json(rewards);

  } catch (error) {
    return next(error);
  }
}


async function createReward(request, response, next) {
  try {
    const { name, quota } = request.body;

    if (!name) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Reward name is required'
      );
    }

    if (!quota) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Quota is required'
      );
    }

    if (quota <= 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Quota must be greater than 0'
      );
    }

    const success = await gachaService.createReward(name, quota);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create reward'
      );
    }

    return response.status(201).json({message: 'Reward created successfully'});

  } catch (error) {
    return next(error);
  }
}

async function getAllLogs(request, response, next) {
  try {
    const logs = await gachaService.getAllLogs();

    if (!logs) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to get gacha logs'
      );
    }

    return response.status(200).json(logs);

  } catch (error) {
    return next(error);
  }
}

async function getUserLogs(request, response, next) {
  try {
    const { userId } = request.params;

    if (!userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'userId is required'
      );
    }

    const logs = await gachaService.getUserLogs(userId);

    if (!logs) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to get user logs'
      );
    }

    return response.status(200).json(logs);

  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinners();

    if (!winners) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to get winners data'
      );
    }

    return response.status(200).json(winners);

  } catch (error) {
    return next(error);
  }
}

module.exports = {
  gacha,
  getRewards,
  createReward,
  getAllLogs,
  getUserLogs,
  getWinners
};
