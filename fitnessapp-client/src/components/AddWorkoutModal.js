// import React, { useState } from 'react';
// import axios from 'axios';
// import notyf from '../utils/notyf';
// import { Modal, Button } from 'react-bootstrap';

// const AddWorkoutModal = ({ show, onHide, fetchWorkouts }) => {
//   const [name, setName] = useState('');
//   const [duration, setDuration] = useState('');

//   const handleAddWorkout = async () => {
//     const token = localStorage.getItem('token'); // Retrieve token from local storage

//     if (!token) {
//       console.error('No token found');
//       notyf.error('Authentication required');
//       return;
//     }

//     try {
//       await axios.post('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
//         name,
//         duration
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchWorkouts();
//       notyf.success('Workout added successfully');
//       onHide(); // Close the modal
//     } catch (error) {
//       console.error(error);
//       notyf.error('Failed to add workout');
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Workout</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Workout Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           className="form-control mt-2"
//           placeholder="Duration"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//         />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleAddWorkout}>
//           Add Workout
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddWorkoutModal;

import React, { useState } from 'react';
import axios from 'axios';
import notyf from '../utils/notyf';
import { Modal, Button } from 'react-bootstrap';

const AddWorkoutModal = ({ show, onHide, fetchWorkouts }) => {
  const [formData, setFormData] = useState({ name: '', duration: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddWorkout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      notyf.error('Authentication required');
      return;
    }

    try {
      await axios.post(
        'https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWorkouts();
      notyf.success('Workout added successfully');
      onHide();
    } catch (error) {
      console.error('Error adding workout:', error);
      notyf.error('Failed to add workout');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          placeholder="Workout Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddWorkout}>
          Add Workout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWorkoutModal;
