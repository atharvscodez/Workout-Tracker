import { getVolume, getWorkoutVolume } from "../utils";

export default function WorkoutList({ workouts, selectedWorkoutId, onSelect, onDeleteWorkout, onDeleteExercise }) {
  return (
    <section className="card workout-list-section">
      <h2>All Workouts</h2>
      {workouts.length === 0 && <p className="empty">No workouts yet.</p>}
      <ul className="workout-list">
        {workouts.map((w) => (
          <li
            key={w.id}
            className={`workout-item${selectedWorkoutId === w.id ? " selected" : ""}`}
            onClick={() => onSelect(w.id)}
          >
            <div className="workout-item-header">
              <div>
                <span className="workout-name">{w.workoutName}</span>
                <span className="workout-meta">{w.date} &middot; {w.durationMinutes} min</span>
              </div>
              <button
                className="btn-danger-sm"
                onClick={(e) => { e.stopPropagation(); onDeleteWorkout(w.id); }}
                title="Delete workout"
              >
                &times;
              </button>
            </div>
            <div className="workout-item-footer">
              <span>{w.exercises.length} exercise{w.exercises.length !== 1 ? "s" : ""}</span>
              <span className="volume-badge">Volume: {getWorkoutVolume(w).toLocaleString()} kg</span>
            </div>
            {w.exercises.length > 0 && (
              <table className="exercise-table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Group</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Volume</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {w.exercises.map((ex) => (
                    <tr key={ex.id}>
                      <td>{ex.name}</td>
                      <td><span className="muscle-tag">{ex.muscleGroup}</span></td>
                      <td>{ex.sets}</td>
                      <td>{ex.reps}</td>
                      <td>{ex.weight} kg</td>
                      <td>{getVolume(ex).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn-danger-sm"
                          onClick={(e) => { e.stopPropagation(); onDeleteExercise(w.id, ex.id); }}
                          title="Delete exercise"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
