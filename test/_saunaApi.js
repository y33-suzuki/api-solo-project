const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();

// データベースへの接続の初期化
const config = require("../config");
const knex = require("knex")(config.db);

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Sauna API Server", () => {
  let request;
  beforeEach(async () => {
    await knex.raw("SELECT SETVAL ('activities_id_seq', 1, false)");
    await knex.seed.run({ directory: "./models/seeds" });
    request = chai.request(server).keepOpen();
  });

  after(async function() {
    await knex.raw("SELECT SETVAL ('activities_id_seq', 1, false)");
    await knex.seed.run({ directory: "./models/seeds" });
  });

  describe("GET /api/activity", () => {
    it("should return status 200 and all activities", async () => {
      const res = await request.get("/api/activity");
      res.should.have.status(200);
      res.should.be.json;
    });
  });

  describe("POST /api/activity", () => {
    it("should return status 201 when posting activity", async () => {
      const res = await request.post("/api/activity").send({
        user_id: 1,
        sauna_id: 3,
        report: "テストサウナ",
        relax_level: 3,
      });
      res.should.have.status(201);
      const res2 = await request.get("/api/activity/3");
      res2.should.be.json;
      JSON.parse(res2.text).report.should.equal("テストサウナ");
    });
  });

  describe("GET /api/activity/:id", () => {
    it("should return status 200 and activity with posted id", async () => {
      const res = await request.get("/api/activity/1");
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).sauna_id.should.equal(1);
    });
  });

  describe("PATCH /api/activity/:id", () => {
    it("should modify activity", async () => {
      const res = await request
        .patch("/api/activity/2")
        .send({ report: "レポートを修正します", relax_level: 2 });
      res.should.have.status(200);
      const res2 = await request.get("/api/activity/2");
      res2.should.be.json;
      JSON.parse(res2.text).report.should.equal("レポートを修正します");
    });
  });

  describe("DELETE /api/activity/:id", () => {
    it("should delete activity", async () => {
      const res = await request.delete("/api/activity/2");
      res.should.have.status(200);
      const res2 = await request.get("/api/activity/2");
      res2.should.have.status(404);
    });
  });

  describe("GET /api/sauna", () => {
    it("should return status 200 and all saunas", async () => {
      const res = await request.get("/api/sauna");
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
