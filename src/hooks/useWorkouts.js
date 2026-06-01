import { useEffect, useState } from "react";
import {
  collection, onSnapshot, addDoc, deleteDoc, updateDoc,
  doc, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export function useWorkouts(uid) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;
    const q = query(
      collection(db, "users", uid, "workouts"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setWorkouts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [uid]);

  async function addWorkout(workout) {
    await addDoc(collection(db, "users", uid, "workouts"), {
      ...workout,
      createdAt: serverTimestamp(),
    });
  }

  async function deleteWorkout(workoutId) {
    await deleteDoc(doc(db, "users", uid, "workouts", workoutId));
  }

  async function addExercise(workoutId, exercise) {
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) return;
    await updateDoc(doc(db, "users", uid, "workouts", workoutId), {
      exercises: [...workout.exercises, exercise],
    });
  }

  async function deleteExercise(workoutId, exerciseId) {
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) return;
    await updateDoc(doc(db, "users", uid, "workouts", workoutId), {
      exercises: workout.exercises.filter((ex) => ex.id !== exerciseId),
    });
  }

  return { workouts, loading, error, addWorkout, deleteWorkout, addExercise, deleteExercise };
}
