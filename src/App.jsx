import { useState } from "react";
import "./App.css";
import { useWorkouts } from "./hooks/useWorkouts";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import ExerciseForm from "./components/ExerciseForm";
import StatsPanel from "./components/StatsPanel";

const USER_ID = "local-user";

export default function App() {
  const { workouts, loading, error, addWorkout, deleteWorkout, addExercise, deleteExercise } =
    useWorkouts(USER_ID);

  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [activeTab, setActiveTab] = useState("workouts");

  async function handleDeleteWorkout(id) {
    await deleteWorkout(id);
    if (selectedWorkoutId === id) setSelectedWorkoutId(null);
  }

  const selectedWorkout = workouts.find((w) => w.id === selectedWorkoutId) ?? null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Workout Tracker</h1>
        <nav className="tabs">
          <button
            className={`tab${activeTab === "workouts" ? " active" : ""}`}
            onClick={() => setActiveTab("workouts")}
          >
            Workouts
          </button>
          <button
            className={`tab${activeTab === "stats" ? " active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </button>
        </nav>
      </header>

      <main className="app-main">
        {loading && <p className="loading">Loading...</p>}
        {!loading && error && (
          <div className="firebase-error">
            <strong>Firebase error</strong>
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && (
          <>
            {activeTab === "workouts" && (
              <div className="workouts-tab">
                <WorkoutForm onAdd={addWorkout} />
                <div className="split">
                  <WorkoutList
                    workouts={workouts}
                    selectedWorkoutId={selectedWorkoutId}
                    onSelect={setSelectedWorkoutId}
                    onDeleteWorkout={handleDeleteWorkout}
                    onDeleteExercise={deleteExercise}
                  />
                  <ExerciseForm
                    selectedWorkout={selectedWorkout}
                    onAdd={(exercise) => addExercise(selectedWorkoutId, exercise)}
                  />
                </div>
              </div>
            )}
            {activeTab === "stats" && <StatsPanel workouts={workouts} />}
          </>
        )}
      </main>
    </div>
  );
}
