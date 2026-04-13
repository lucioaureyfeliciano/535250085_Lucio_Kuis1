## Endpoint yang dapat diakses

1. POST api/gacha
   Digunakan untuk melakukan gacha/undian. dan lognya akan di catat di schema GachaLogs.

   Input yang dibutuhkan berupa userId pada body
   Contoh:
   {
   "userId": "69d5e83fd24967db8a6d2555"
   }

2. GET api/gacha/rewards
   Digunakan untuk menampilkan daftar hadiah dan kuota pemenang yang tersisa untuk setiap hadiah.

3. POST api/gacha/rewards
   Digunakan untuk menambahkan hadiah dan kuotanya ke schema Rewards.

   Input yang dibutuhkan berupa name dan quota pada body
   Contoh:
   {
   "name": "Pulsa Rp50.000",
   "quota": 500
   }

4. GET api/gacha/logs
   Digunakan untuk menampilkan semua histori/log gacha yang pernah dilakukan beserta hadiah yang dimenangkan (bila ada).

5. GET api/gacha/logs/:userId
   Digunakan untuk menampilkan histori/log gacha yang pernah dilakukan beserta hadiah yang dimenangkan (bila ada) dari user tertentu berdasarkan ID user.

   Parameter yang dibutuhkan berupa userId
   Contoh:
   GET localhost:5000/api/gacha/logs/69dbc681e4ff3b263fac72b8

6. GET api/gacha/winners
   Digunakan untuk menampilkan daftar orang yang berhasil memenangkan setiap hadiahnya.
