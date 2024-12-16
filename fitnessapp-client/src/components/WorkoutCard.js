import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import notyf from '../utils/notyf';

const WorkoutCard = ({ workout, onDelete, onComplete }) => {
  const { _id, name, duration, status, dateAdded } = workout;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(
        `https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onDelete(_id);
      notyf.success('Workout deleted successfully');
    } catch (error) {
      console.error('Error deleting workout:', error.response ? error.response.data : error.message);
      notyf.error('Failed to delete workout');
    }
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(
        `https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${_id}`,
        {}, // Empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        onComplete(_id);
        notyf.success('Workout marked as completed');
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error marking workout as completed:', error.response ? error.response.data : error.message);
      notyf.error('Failed to mark workout as completed');
    }
  };

  return (
    <div className="col-md-4">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Duration: {duration}</Card.Text>
          <Card.Text>Status: {status}</Card.Text>
          <Card.Text>Date Added: {new Date(dateAdded).toLocaleDateString()}</Card.Text>
          <Button variant="danger" onClick={handleDelete} className="me-2">
            Delete
          </Button>
          <Button variant="success" onClick={handleComplete}>
            Mark as Completed
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WorkoutCard;
