import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // For fetching task ID from the URL

const UpdateTask = () => {
  const { id } = useParams(); // Fetch task ID from route params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch task data by id for pre-filling the form
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://backendtodoproject.onrender.com/tasks/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        const { title, description, status } = response.data;
        setTitle(title);
        setDescription(description);
        setStatus(status);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://backendtodoproject.onrender.com/tasks/${id}`,
        { title, description, status },
        {
          headers: { Authorization: token },
        }
      );
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Failed to update task", error.response.data);
      alert("Failed to update task.");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default UpdateTask;
