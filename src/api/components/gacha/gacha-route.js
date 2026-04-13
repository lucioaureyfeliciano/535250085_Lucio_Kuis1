const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  // Endpoint untuk melakukan gacha
  route.post('/', gachaController.gacha);

  // Endpoint untuk mendapatkan daftar hadiah dan kuota yang tersisa
  route.get('/rewards', gachaController.getRewards);

  // Endpoint untuk menambahkan hadiah baru
  route.post('/rewards', gachaController.createReward);

  // Endpoint untuk mendapatkan semua log gacha
  route.get('/logs', gachaController.getAllLogs);

  // Endpoint untuk mendapatkan log gacha berdasarkan userId
  route.get('/logs/:userId', gachaController.getUserLogs);

  // Endpoint untuk mendapatkan daftar pemenang dengan nama disamarkan
  route.get('/winners', gachaController.getWinners);
};
