const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Sauna API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });

  describe("GET /api/activity", () => {
    it("should return status 200 and all activities", async () => {
      const res = await request.get("/api/activity");
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text)[0].sauna_id.should.equal(1);
      JSON.parse(res.text)[0].sauna_name.should.equal("スカイスパYOKOHAMA");
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
      const res2 = await request.get("/api/activity");
      res2.should.be.json;
      JSON.parse(res2.text)[2].report.should.equal("テストサウナ");
    });
  });

  describe("PATCH /api/activity/:id", () => {
    it("should modify activity", async () => {
      const res = await request
        .patch("/api/activity/9")
        .send({ report: "レポートを修正します", relax_level: 2 });
      res.should.be.json;
      JSON.parse(res.text)[0].report.should.to.deep.equal(
        "レポートを修正します"
      );
    });
  });
});
