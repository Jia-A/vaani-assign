import { useState } from "react";
import Modal from "react-modal";
import "../styles/homepage.css";
import { useTask } from "../context/taskContext";

const Homepage = () =>{
    const [ addModal, setAddModal ] = useState(false);
    const [currentTask, setCurrentTask] =  useState({})
    const [ mark, setMark ]  = useState(false);

    const { tasks, createTask, singleTask, setSingleTask, editing, setEditing, editTask, deleteTask } = useTask();
    console.log(tasks)
    const taskModalFunction = () =>{
        setAddModal(true);
    }

    const editTaskHandler = (task) =>{
        setEditing(true);
        setAddModal(true);
        setSingleTask({...singleTask, todo : task.todo})
        setCurrentTask(task)  
        
    }

    const checkHandler = (task) =>{
        if(editing===true){
            console.log("edit task")
            editTask(task.id)
            setSingleTask({
                todo : "",
                
            });
            setEditing(false)
        }
        else{
            createTask();
            setAddModal(false)
        }
    }

    const customStyle = {
        overlay: {
          backgroundColor: "rgba(52, 58, 64, 0.8)",
        },
        content: {
          width: "18rem",
          maxHeight: "10rem",
          margin: "4rem auto",
          backgroundColor: "#1D3461",
          color : "#a0b2b9",
          textAlign : "center",
          border : "none",
          
        },
      };

    return(
        <div className="App">
            <main className="main-container">
                <div className="task-box">
                    <h2 className="box-head">Your Tasks</h2>
                    <div className="task-list">
                        {tasks.map((task)=>(
                            <div className="task-item">
                            <p className="task-name">
                                { mark ? 
                                (<input type="checkbox" className="mark x " onChange={()=> setMark(false)}></input>) : 
                                (<input type="checkbox"  className="unmark x" onChange={()=> setMark(true)}></input>)
                                }
                                <span className="y">{task.todo}</span></p>
                            <div className="list-btn">
                                <span className="btn" onClick={()=>editTaskHandler(task)}><i className="far fa-edit list-icon"></i></span>
                                <span className="btn" onClick={()=>deleteTask(task.id)}><i className="far fa-trash-alt list-icon"></i></span>
                            </div>
                            </div>
                        ))}    
                    </div>
                    <button className="add-task-btn" onClick={()=> taskModalFunction()}>Add more tasks</button>  
                </div>
            </main>
            {
                addModal && (
                    <Modal isOpen={addModal} style={customStyle}>
                        <header className="modal-head">
                            <p className="head">New Task</p>
                            <span  className = "cancel" onClick={() => setAddModal(false)}><i className="far fa-times"></i></span>
                        </header>
                        <main>
                            <label htmlFor="task" className="label">
                                Name
                            </label>
                            <input type="text" className="modal-inp input" value={singleTask.todo} autoFocus onChange={(e) =>setSingleTask({ ...singleTask, todo: e.target.value })}
                            required/>
   
                            <button className="modal-btn" onClick={()=>checkHandler(currentTask)}>Add Task</button> 
                        </main>
                    </Modal>
                )
            }
        </div>
    );
}

export { Homepage }