const request = require("supertest");
const app = require("../app");

test("should sign up a new user", async () => {
  try {
    await request(app)
      .post("/users")
      .send({
        name: "shahlamshaef",
        email: "norulshahlam@gmail.com",
        password: "abcd12345",
      })
      .expect(201);
  } catch (e) {
    console.log(e);
  }
});
