// Expressサーバの準備
const express = require("express");
const app = express();
app.use(express.json());

// データベースへの接続の初期化
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const setupServer = () => {
  app.get("/api/activity", (req, res) => {
    models.list
      .then((activities) => activities.map((activity) => activity.serialize()))
      .then((activities) => res.status(200).json(activities));
  });

  return app;
};

module.exports = { setupServer };
