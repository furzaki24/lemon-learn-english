const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJzYXlha2FAbWFpbC5jb20iLCJuYW1lIjoic2F5YWthIiwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE2MzY3NTk2MDV9.CiP7QMvhu1lipMFkj4YtHJSAGlcryMuwb65pC0pR1V8";

describe("POSTS /levels", () => {
  test("201 success create level", (done) => {
    request(app)
      .post("/levels")
      .send({
        name: "very hard",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("message", "Success add level");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /levels", () => {
  test("200 success get levels", (done) => {
    request(app)
      .get("/levels")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("name");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /levels/:id", () => {
  test("200 success get levels by id", (done) => {
    request(app)
      .get(`/levels/${1}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get levels because id not found", (done) => {
    request(app)
      .get(`/levels/${100}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Level with ID 100 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed get levels because id not number", (done) => {
    request(app)
      .get(`/levels/not_number_id`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please check your ID");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("UPDATE /levels/:id", () => {
  test("200 success update levels", (done) => {
    request(app)
      .put(`/levels/${3}`)
      .set({
        access_token: token,
      })
      .send({
        name: "Very Easy",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Success update level");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update level because id not found", (done) => {
    request(app)
      .put(`/levels/${67}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Level with ID 67 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed update level because id not number", (done) => {
    request(app)
      .put(`/levels/not_number_id`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please check your ID");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /levels/:id", () => {
  test("200 success delete level", (done) => {
    request(app)
      .delete(`/levels/${3}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Success delete level");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed delete level because id not found", (done) => {
    request(app)
      .delete(`/levels/${67}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Level with ID 67 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed delete Level because id not number", (done) => {
    request(app)
      .delete(`/levels/not_number_id`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please check your ID");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
