import React, { useEffect, useState } from 'react';
import { getMyWorkouts } from '../utils/api';
import WorkoutCard from '../components/WorkoutCard';
import AddWorkoutModal from '../components/AddWorkoutModal';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const response = await getMyWorkouts();
      setWorkouts(response.data.workouts || []);
    } catch (error) {
      console.error('Failed to fetch workouts');
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
  };

  const handleComplete = (id) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === id ? { ...workout, status: 'Completed' } : workout
      )
    );
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Button
        id="addWorkout"
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        Add Workout
      </Button>

      <AddWorkoutModal
        show={showModal}
        onHide={() => setShowModal(false)}
        fetchWorkouts={fetchWorkouts}
      />

      {workouts.length === 0 ? (
        <div>No workouts found.</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;