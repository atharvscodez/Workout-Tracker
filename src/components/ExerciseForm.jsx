import { useState } from "react";
import { MUSCLE_GROUPS, emptyExerciseForm } from "../utils";

export default function ExerciseForm({ selectedWorkout, onAdd }) {
  const [form, setForm] = useState(emptyExerciseForm);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.sets || !form.reps || !form.weight) {
      setError("All fields are required.");
      return;
    }
    const sets = parseInt(form.sets);
    const reps = parseInt(form.reps);
    const weight = parseFloat(form.weight);
    if (isNaN(sets) || sets <= 0 || isNaN(reps) || reps <= 0 || isNaN(weight) || weight < 0) {
      setError("Sets and reps must be positive integers; weight must be non-negative.");
      return;
    }
    onAdd({ id: crypto.randomUUID(), name: form.name.trim(), sets, reps, weight, muscleGroup: form.muscleGroup });
    setForm(emptyExerciseForm);
    setError("");
  }

  return (
    <section className="card add-exercise-section">
      <h2>Add Exercise</h2>
      {!selectedWorkout ? (
        <p className="empty">Select a workout from the list to add exercises.</p>
      ) : (
        <>
          <p className="selected-workout-label">
            Adding to: <strong>{selectedWorkout.workoutName}</strong>
          </p>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Exercise Name
              <input
                type="text"
                placeholder="e.g. Bench Press"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>
            <label>
              Muscle Group
              <select
                value={form.muscleGroup}
                onChange={(e) => setForm((f) => ({ ...f, muscleGroup: e.target.value }))}
              >
                {MUSCLE_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <div className="form-row">
              <label>
                Sets
                <input
                  type="number"
                  min="1"
                  placeholder="3"
                  value={form.sets}
                  onChange={(e) => setForm((f) => ({ ...f, sets: e.target.value }))}
                />
              </label>
              <label>
                Reps
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={form.reps}
                  onChange={(e) => setForm((f) => ({ ...f, reps: e.target.value }))}
                />
              </label>
              <label>
                Weight (kg)
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="60"
                  value={form.weight}
                  onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
                />
              </label>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn-primary">Add Exercise</button>
          </form>
        </>
      )}
    </section>
  );
}
