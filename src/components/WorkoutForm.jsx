import { useState } from "react";
import { emptyWorkoutForm } from "../utils";

export default function WorkoutForm({ onAdd }) {
  const [form, setForm] = useState(emptyWorkoutForm);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.workoutName.trim() || !form.date || !form.durationMinutes) {
      setError("All fields are required.");
      return;
    }
    const duration = parseInt(form.durationMinutes);
    if (isNaN(duration) || duration <= 0) {
      setError("Duration must be a positive number.");
      return;
    }
    onAdd({
      workoutName: form.workoutName.trim(),
      date: form.date,
      durationMinutes: duration,
      exercises: [],
    });
    setForm(emptyWorkoutForm);
    setError("");
  }

  return (
    <section className="card">
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>
            Name
            <input
              type="text"
              placeholder="e.g. Push Day"
              value={form.workoutName}
              onChange={(e) => setForm((f) => ({ ...f, workoutName: e.target.value }))}
            />
          </label>
          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </label>
          <label>
            Duration (min)
            <input
              type="number"
              min="1"
              placeholder="60"
              value={form.durationMinutes}
              onChange={(e) => setForm((f) => ({ ...f, durationMinutes: e.target.value }))}
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-primary">Add Workout</button>
      </form>
    </section>
  );
}
