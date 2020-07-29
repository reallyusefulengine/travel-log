const { Router } = require("express");
const logEntry = require("../models/logEntry");
const LogEntry = require("../models/logEntry");
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.route("/:id").put((req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const comments = req.body.comments;
  const image = req.body.image;
  const rating = req.body.rating;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const visitDate = req.body.visitDate;

  LogEntry.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((entry) => res.json(entry))
    .catch((error) => next(error));
});

router.route("/:id").get((req, res, next) => {
  LogEntry.findById(req.params.id)
    .then((entry) => {
      res.json(entry);
    })
    .catch((error) => next(error));
});

router.route("/:id").delete((req, res, next) => {
  LogEntry.findByIdAndDelete(req.params.id)
    .then((entry) => res.json({ message: "entry was deleted" }))
    .catch((error) => next(error));
});

module.exports = router;
