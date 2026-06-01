import { getAverageDuration, getTotalVolume } from "../utils";

export default function StatsPanel({ workouts }) {
  return (
    <section className="card stats-section">
      <h2>Stats</h2>
      {workouts.length === 0 ? (
        <p className="empty">No data yet. Add some workouts to see stats.</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{workouts.length}</span>
            <span className="stat-label">Total Workouts</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{getAverageDuration(workouts).toFixed(1)}</span>
            <span className="stat-label">Avg Duration (min)</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{getTotalVolume(workouts).toLocaleString()}</span>
            <span className="stat-label">Total Volume (kg)</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {workouts.reduce((sum, w) => sum + w.exercises.length, 0)}
            </span>
            <span className="stat-label">Exercises Logged</span>
          </div>
        </div>
      )}
    </section>
  );
}
