async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    // removed totalDuration from this object and added it tallyExercises() function because this was returning 'undefined'
    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };

    console.log(workoutSummary)
    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

// added units to strings
function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalDuration = (acc.totalDuration || 0) + curr.duration + " minutes";
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight + " lbs";
      acc.totalSets = (acc.totalSets || 0) + curr.sets + " sets";
      acc.totalReps = (acc.totalReps || 0) + curr.reps + " reps";
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance + " miles";
      acc.totalDuration = (acc.totalDuration || 0) + curr.duration + " minutes";
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
