// Expressサーバの準備
const express = require("express");
const app = express();
app.use(express.json());

// CORS対応
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );
  next();
};
app.use(allowCrossDomain);

// データベースへの接続の初期化
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const setupServer = () => {
  app.get("/api/activity", (req, res) => {
    models.list().then((activities) => res.status(200).json(activities));
  });

  app.post("/api/activity", (req, res) => {
    models.create(req.body);
    res.status(201).end();
  });

  app.get("/api/activity/:id", (req, res) => {
    models
      .selectSingle({ id: req.params.id })
      .then((activities) => {
        res.status(200).json(activities);
      })
      .catch(() => res.status(404).end());
  });

  app.patch("/api/activity/:id", (req, res) => {
    models.update({ id: req.params.id, ...req.body });
    res.status(200).end();
  });

  app.delete("/api/activity/:id", (req, res) => {
    models.delete({ id: req.params.id });
    res.status(200).end();
  });

  app.get("/api/sauna", (req, res) => {
    models.getSauna.then((saunas) => res.status(200).json(saunas));
  });

  return app;
};

module.exports = { setupServer };
