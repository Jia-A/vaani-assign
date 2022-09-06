import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

const TaskContext =  createContext();

const TaskProvider = ( { children } ) => {
    const [ tasks, setTasks ] = useState([]);
    const [editing, setEditing] = useState(false);
    const [ singleTask, setSingleTask ] = useState({
        todo : "",
    })

    const taskCollectionResponse = collection(db, "tasks");

   
  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(taskCollectionResponse);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, []);

  const createTask = async () => {
    const docResponse = await addDoc(taskCollectionResponse, {
      todo: singleTask.todo,
    });
    setTasks((value) => [
      ...value,
      {
        id: docResponse.id,
        todo: singleTask.todo,
      },
    ]);
    setSingleTask({
        todo : "",
        
    });
  };

  const deleteTask = async (id) => {
    const selectedDocResponse = doc(db, "tasks", id);
    await deleteDoc(selectedDocResponse);
    const tasksAfterDelete = tasks.filter((task) => task.id !== id);
    setTasks(tasksAfterDelete);
  };

  const editTask = async (id) => {
    const selectedDocResponse = doc(db, "tasks", id);
    const dataToUpdate = {
        todo: singleTask.todo,
        
    };
    await updateDoc(selectedDocResponse, dataToUpdate);
    const tasksAfterUpdate = tasks.map((task) => task.id === id ? {...singleTask, id: id, updatedOn: new Date()} : task);
    setTasks(tasksAfterUpdate);
    setEditing(false);
    setSingleTask({
        todo : "",
        
    });
  };

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            singleTask,
            setSingleTask,
            createTask,
            deleteTask,
            editTask,
            editing,
            setEditing}}>{children}</TaskContext.Provider>
    )
}

const useTask = () => useContext(TaskContext);

export { TaskProvider, useTask };