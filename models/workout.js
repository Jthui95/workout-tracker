const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    day: {
    type: Date,
    default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter type of workout"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter name of workout"
            },
            duration: {
                type: Number,
                validate: [({ length }) => length >= 0, "Duration should be at least 0."] 
            },
            weight: {
                type: Number,
                validate: [({ length }) => length >= 0, "Weight should be at least 0."] 
            },
            reps: {
                type: Number,
                validate: [({ length }) => length >= 0, "Reps should be at least 0."] 
            },
            sets: {
                type: Number,
                validate: [({ length }) => length >= 0, "Sets should be at least 0."] 
            },
            distance: {
                type: Number,
                validate: [({ length }) => length >= 0, "Distance should be at least 0."] 
            }
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;