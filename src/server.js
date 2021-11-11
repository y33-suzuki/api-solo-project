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

  app.post("/api/activity", (req, res) => {
    models.create(req.body);
    res.status(201).end();
  });

  app.get("/api/activity/:id", (req, res) => {
    models
      .selectSingle({ id: req.params.id })
      .then((activities) => res.status(200).json(activities));
  });

  app.patch("/api/activity/:id", (req, res) => {
    models.update({ id: req.params.id, ...req.body });
    res.status(200).end();
  });

  return app;
};

module.exports = { setupServer };
