
import './TaskList.css'
import { MdEditNote } from "react-icons/md";

const TaskList = (props)=>{
    const {tasks,colors,onDeleteTask,onChangeCheckbox,onClickEdit} = props
    const {id,TaskName,Description,DueDate,Status,Priority} = tasks
    const {statusColors,priorityColors} = colors
    let checkStatus = false
    let disableStatus = false
    let textStatus = ""
    let cursorStyle = ""
    if(Status === "Completed"){
        checkStatus = true;
        disableStatus = true;
        textStatus = "line-through"
        cursorStyle = "default"
    }
    
    
    return (
        <li className="list-item">
                <div className="check-and-edit-container">
                    <input type="checkbox" disabled={disableStatus} checked={checkStatus} onChange={()=>onChangeCheckbox(id)} className="task-checkbox"/>
                    <p className="status" style={{color:statusColors[Status]}}>{Status}</p>
                    <button className="edit-button" onClick={() => onClickEdit(id)} style={{cursor:cursorStyle}} disabled={disableStatus}><MdEditNote size={24}/></button>
                    
                </div>
              <h1 className="title" style={{textDecoration:textStatus}}>{TaskName}</h1>
              <p className="description" style={{textDecoration:textStatus}}>{Description}</p>
              <p className="status" style={{textDecoration:textStatus}}>Due Date: <span >{DueDate}</span></p>
              <p className="status" style={{textDecoration:textStatus}}>Priority: <span style={{color:priorityColors[Priority]}}>{Priority}</span></p>
              <button className="delete-button" onClick={() => onDeleteTask(id)}>Delete</button>
        </li>
    )

}


export default TaskList