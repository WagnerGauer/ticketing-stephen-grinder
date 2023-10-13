import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "sfsdf",
      price: 32,
    })
    .expect(404);
});
it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "sdfsd", price: 32 })
    .expect(401);
});
it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "sdfsdf", price: 32 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "idoi4ed",
      price: 23,
    })
    .expect(401);
});
it("doesn't update the ticket price or title if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "sdfsdf", price: 32 });

  const responseFromFollowUpRequest = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(responseFromFollowUpRequest.body.title).toEqual("sdfsdf");
  expect(responseFromFollowUpRequest.body.price).toEqual(32);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "sdfsdf", price: 32 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "sdfsfddsf", price: -20 })
    .expect(400);
});
it("updates the ticket provided valid inputs", async () => {
  // s
});
