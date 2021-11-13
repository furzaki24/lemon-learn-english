const request = require("supertest");
const app = require("../app");

const { sequelize, Class } = require("../models");
const { queryInterface } = sequelize;

// beforeAll((done) => {
//   // set initial data
//   /*

//     */
//   // Class.create();
// });

// afterAll((done) => {
//   // clean up
// });

// insert token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJzYXlha2FAbWFpbC5jb20iLCJuYW1lIjoic2F5YWthIiwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE2MzY3NTk2MDV9.CiP7QMvhu1lipMFkj4YtHJSAGlcryMuwb65pC0pR1V8";

describe("POSTS /tasks", () => {
  test("201 success create tasks", (done) => {
    request(app)
      .post("/tasks/add")
      .send({
        name: "task one",
        description: "task one description",
        classId: 1,
        soundUrl: "www.example.com",
        question: "question",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("result");
        expect(body.result).toHaveProperty("name", "task one");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed create task bad request", (done) => {
    request(app)
      .post("/tasks/add")
      .send({
        description: "task one description",
        classId: 1,
        soundUrl: "www.example.com",
        question: "question",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Task name can't be empty"]);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /tasks", () => {
  test("200 success get tasks", (done) => {
    request(app)
      .get("/tasks")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed get tasks", (done) => {
    request(app)
      .get("/tasks")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body.message).toBe("jwt must be provided");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /tasks/:id", () => {
  test("200 success get task by id", (done) => {
    request(app)
      .get(`/tasks/${1}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", "Twinkle Twinkle Little Star");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get task cause invalid id", (done) => {
    request(app)
      .get(`/tasks/${99}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Task with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("UPDATE /tasks", () => {
  test("200 success update tasks", (done) => {
    request(app)
      .put(`/tasks/${1}`)
      .send({
        name: "test five",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Task with ID 1 Updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update task cause invalid id", (done) => {
    request(app)
      .put(`/tasks/${99}`)
      .set({
        access_token: token,
      })
      .send({
        name: "test five",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Task with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /tasks", () => {
  test("200 success delete tasks", (done) => {
    request(app)
      .delete(`/tasks/${1}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Task with ID 1 Deleted");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed delete task cause invalid id", (done) => {
    request(app)
      .delete(`/tasks/${99}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Task with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
