// Expressサーバの準備
const express = require("express");
const app = express();
app.use(express.json());

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

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

const options = {
  swaggerDefinition: {
    info: {
      title: "サ活のAPI",
      version: "1.0.0",
    },
  },
  apis: ["./src/server.js"],
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

const setupServer = () => {
  /**
   * @swagger
   * /api/activity:
   *   get:
   *     tags:
   *       - "activity"
   *     summary: サ活DBに登録されている全サ活を返却します。
   *     description: サ活DBに登録されている全サ活を返却します。
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: サ活DBに登録されている全サ活を返却する
   */
  app.get("/api/activity", (req, res) => {
    models.list().then((activities) => res.status(200).json(activities));
  });

  /**
   * @swagger
   * /api/activity:
   *   post:
   *     tags:
   *       - "activity"
   *     summary: サ活DBにサ活を登録します。
   *     description: サ活DBにサ活を登録します。
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: user
   *         description: The user to create.
   *         schema:
   *           type: object
   *           required:
   *             - sauna_id
   *             - user_id
   *             - report
   *             - relax
   *           properties:
   *             sauna_id:
   *               type: number
   *             user_id:
   *               type: number
   *             report:
   *               type: string
   *             relax:
   *               type: number
   *     responses:
   *       201:
   *         description: 登録に成功した場合、201を返却します。
   */
  app.post("/api/activity", (req, res) => {
    models.create(req.body);
    res.status(201).end();
  });

  /**
   * @swagger
   * /api/activity/{id}:
   *   get:
   *     tags:
   *       - "activity"
   *     summary: 指定のIDのサ活を返却します。
   *     description: 指定のIDのサ活を返却します。
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: "id"
   *         in: "path"
   *         description: "指定のIDのサ活を返却します。"
   *         required: true
   *         type: "integer"
   *     responses:
   *       200:
   *         description: 指定のIDのサ活を返却します。
   */
  app.get("/api/activity/:id", (req, res) => {
    models
      .selectSingle({ id: req.params.id })
      .then((activities) => {
        res.status(200).json(activities);
      })
      .catch(() => res.status(404).end());
  });

  /**
   * @swagger
   * /api/activity/{id}:
   *   patch:
   *     tags:
   *       - "activity"
   *     summary: 指定のIDのサ活を修正します。
   *     description: 指定のIDのサ活を修正します。
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: "id"
   *         in: "path"
   *         description: "指定のIDのサ活を修正します。"
   *         required: true
   *         type: "integer"
   *       - in: body
   *         name: user
   *         description: The user to create.
   *         schema:
   *           type: object
   *           required:
   *             - report
   *             - relax
   *           properties:
   *             report:
   *               type: string
   *             relax:
   *               type: number
   *     responses:
   *       200:
   *         description: 指定のIDのサ活を修正します。
   */
  app.patch("/api/activity/:id", (req, res) => {
    models.update({ id: req.params.id, ...req.body });
    res.status(200).end();
  });

  /**
   * @swagger
   * /api/activity/{id}:
   *   delete:
   *     tags:
   *       - "activity"
   *     summary: 指定のIDのサ活を削除します。
   *     description: 指定のIDのサ活を削除します。
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: "id"
   *         in: "path"
   *         description: "指定のIDのサ活を削除します。"
   *         required: true
   *         type: "integer"
   *     responses:
   *       200:
   *         description: 指定のIDのサ活を削除します。
   */
  app.delete("/api/activity/:id", (req, res) => {
    models.delete({ id: req.params.id });
    res.status(200).end();
  });

  /**
   * @swagger
   * /api/sauna:
   *   get:
   *     tags:
   *       - "sauna"
   *     summary: サ活DBに登録されている全サウナを返却します。
   *     description: サ活DBに登録されている全サウナを返却します。
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: サ活DBに登録されている全サウナを返却します。
   */
  app.get("/api/sauna", (req, res) => {
    models.getSauna.then((saunas) => res.status(200).json(saunas));
  });

  return app;
};

module.exports = { setupServer };
