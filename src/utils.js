export function getVolume(exercise) {
  return exercise.sets * exercise.reps * exercise.weight;
}

export function getWorkoutVolume(workout) {
  return workout.exercises.reduce((sum, ex) => sum + getVolume(ex), 0);
}

export function getAverageDuration(workouts) {
  if (workouts.length === 0) return 0;
  return workouts.reduce((sum, w) => sum + w.durationMinutes, 0) / workouts.length;
}

export function getTotalVolume(workouts) {
  return workouts.reduce((sum, w) => sum + getWorkoutVolume(w), 0);
}

export const MUSCLE_GROUPS = [
  "Chest", "Back", "Shoulders", "Biceps", "Triceps", "Legs", "Core", "Full Body", "Other",
];

export const emptyWorkoutForm = { workoutName: "", date: "", durationMinutes: "" };
export const emptyExerciseForm = { name: "", sets: "", reps: "", weight: "", muscleGroup: "Chest" };
