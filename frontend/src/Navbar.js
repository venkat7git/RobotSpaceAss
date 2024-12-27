import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { MdChecklistRtl } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Navbar = (props) => {
  const navigate = useNavigate()
  const onClickLogOut = ()=>{
    navigate('/login')
  }
  return (
    <>
    <h1 className="todo-heading">Task Management</h1>
    <nav>
      <ul className="heads-list-container">
        <li>
            <Link className="link-tag" to = "/tasks" ><MdChecklistRtl size={24}/></Link>
        </li>
        <li>
            <Link className="link-tag" to = "/newTask" ><MdFormatListBulletedAdd size={24}/></Link>
        </li>

      </ul>
      <button onClick={onClickLogOut} className="logout-btn">Logout</button>
    </nav>
      
    </>
    
  );
};

export default Navbar;
