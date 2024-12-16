import axios from 'axios';

const API_BASE_URL = 'https://fitnessapp-api-ln8u.onrender.com';

export const getMyWorkouts = async () => {
  return await axios.get(`${API_BASE_URL}/workouts/getMyWorkouts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const addWorkout = async (workout) => {
  return await axios.post(`${API_BASE_URL}/workouts/addWorkout`, workout, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};