import "dotenv/config";

import express from "express";
import { ObjectId } from "mongodb";
import { initClient } from "./db/mongo.js";
import { registerMiddleware } from "./middleware/index.js";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT;

const DATA_PATH = "./data/colors.json";

// register middleware
registerMiddleware(app);

// init MongoDB
const client = await initClient();
const db = client.db();

const patchArray = async (userId, colorId, action, arrayName) => {
  const color = await db
    .collection("colors")
    .findOne({ _id: ObjectId(colorId) });
  
  const user = await db
    .collection("users")
    .findOne({ _id: ObjectId(userId) });
  
  if (color && user) {
    let newData;
    if(action == "push" && arrayName == "liked") {
      newData = { $push: {liked: { ...color }}};
    } if (action == "pull" && arrayName == "liked") {
      newData = { $pull: {liked: { ...color }}};
    } if (action == "push" && arrayName == "disliked") {
      newData = { $push: {disliked: { ...color }}};
    }

    // or updateOne
    await db.collection("users").updateOne({ _id: ObjectId(userId) }, newData);

    return newData;
  } else {
    return false;
  }
}

// GET IMPORT
app.get("/import", async (req, res) => {
  const response = await fetch('https://random-data-api.com/api/color/random_color?size=100');
  const data = await response.json();
  
  db.collection('colors').insertMany(data)

  res.send('Data imported')
});

// POST LOGIN
app.post("/login", async (req, res) => {
  const username = req.body.username;

  let user = await db.collection("users").findOne({ username });

  if (!user) {
    const userFields = {
      username,
      "liked": [],
      "disliked": []
    }
    await db.collection("users").insertOne({ ...userFields });
    user = await db.collection("users").findOne({ username });
  }

  res.json(user);
});

const authRouter = express.Router();

// GET COLORS
authRouter.get("/colors", async (req, res) => {
  const userId = req.user._id;

  const user = await db
    .collection("users")
    .findOne({ _id: ObjectId(userId) });
  
  const idDisliked = user.disliked ? user.disliked.map((color) => color._id) : [];
  const idLiked = user.liked ? user.liked.map((color) => color._id) : [];

  const query = {$and: [ {_id: { $nin: idDisliked}}, {_id: {$nin: idLiked}} ] };
  const limit = 10;

  const colors = await db.collection("colors").find(query).limit(limit).toArray();
  res.json(colors);
});

// POST LIKED
authRouter.post("/liked/:id", async (req, res) => {
  const userId = req.user._id;
  const colorId = req.params.id;

  const newData = await patchArray(userId, colorId, "push", "liked");
  if (newData) {
    res.json(newData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE LIKED
authRouter.delete("/liked/:id", async (req, res) => {
  const userId = req.user._id;
  const colorId = req.params.id;

  const newData = await patchArray(userId, colorId, "pull", "liked");
  if (newData) {
    res.json(newData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// POST DISLIKED
authRouter.post("/disliked/:id", async (req, res) => {
  const userId = req.user._id;
  const colorId = req.params.id;

  const newData = await patchArray(userId, colorId, "push", "disliked");
  if (newData) {
    res.json(newData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// GET LIKES
authRouter.get("/likes", async (req, res) => {
  const userId = req.user._id;
  const query = { _id: ObjectId(userId) };
  const projection = {liked: 1};

  const likes = await db.collection("users").findOne(query, {projection: projection});
  res.json(likes);
});

app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    // check if user with id exists
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.headers.authorization) });
    // exists? pass user to request
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.status(401).json({
    error: "Unauthorized",
  });
}, authRouter);

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});

// make sure database is closed when server crashes
const closeServer = () => {
  // default
  process.exit();
};

process.on("SIGINT", () => closeServer());
process.on("SIGTERM", () => closeServer());