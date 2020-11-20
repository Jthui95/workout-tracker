const router = require("express").Router();
const Workout = require("../models/workout.js")


    router.get("/api/workouts", function (req, res) {
        Workout.find()
        .then(dbDeepThoughts => {
            res.json(dbDeepThoughts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(5)
        .then(dbDeepThoughts => {
            res.json(dbDeepThoughts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

    router.post("/api/workouts", function (req, res) {
        Workout.create(res)
        .then(dbDeepThoughts => {
            res.json(dbDeepThoughts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

    router.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(
            params.id,
            { $push: { exercises: body } },
            { new: true, runValidators: true }
        )
        .then(dbDeepThoughts => {
            res.json(dbDeepThoughts);
        })
        .catch(err => {
            res.status(400).json(err);
        });  
});
module.exports = router;