import React, { useState } from "react";
import axios from "axios";
import "./TaskForm.css";
import Navbar from "../../Navbar";
import {v4 as uuidv4} from 'uuid'

const TaskForm = () => {
  const [TaskName, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [DueDate,setDueDate] = useState("");
  const [Status, setStatus] = useState("pending");
  const [Priority,setPriority] =  useState("low");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit executed")
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3007/task/post",
        { id:uuidv4(),TaskName, Description, Status,DueDate,Priority },
        {
          headers: { Authorization: token },
        }
      );
      console.log(response)
      if (response.statusText === 'OK') {
        alert("Task created successfully!");
        // Clear form fields after success
        setTitle("");
        setDescription("");
        setStatus("pending");
        setStatus("low")
        setDueDate(new Date().toLocaleDateString('en-CA'))
      }
    } catch (error) {
      alert(
        "Failed to create task: " + (error.response?.data || "Unknown error")
      );
      console.error("Failed to create task", error.response?.data);
    }
  };
  

  return (
    
    <>
    
    <Navbar/>
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="create-heading">Create Task</h1>
      <input
        className="taskname-input"
        type="text"
        placeholder="Task name"
        value={TaskName}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="description-input-area"
        placeholder="Description"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="dss-container">
        <label className="input-label" htmlFor="dateInput">Due Date</label>
        <input id="dateInput" type="date" value={DueDate} onChange = {(e)=>setDueDate(e.target.value)} className="date-input"/>
      </div>



      <div className="dss-container">
        <label className="input-label" htmlFor="statusSelect">Task Status</label>
        <select id = "statusSelect" className="select-input" value={Status} onChange={(e) => setStatus(e.target.value)}>
          
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      


      <div className="dss-container">
          <label className="input-label" htmlFor="prioritySelect">Task Prioriy</label>
          <select id ="prioritySelect" className="select-input" value={Priority} onChange={(e) => setPriority(e.target.value)}>
            
            <option value="Low">Low</option>
            <option value="Mediuam">Medium</option>
            <option value="High">High</option>
          </select>
      </div>
      <button type="submit" className="add-task-button">Add Task</button>
    </form>
    </>
    
  );
};

export default TaskForm;
