import React, {useState} from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
 import dateFnsFormat from "date-fns/format";
  import  isAfter from "date-fns/isAfter";
  import isBefore from "date-fns/isBefore";
  import addDays  from "date-fns/addDays";
  import isToday from "date-fns/isToday";


const FORMAT="dd/MM/yyyy";
function formatDate(date,format,locale){
    return dateFnsFormat(date,format,{locale});
}
const AddTask=({onCancel,onAddTask})=>{
    const[tasks,setTasks]=useState("");
    const[date,setDate]=useState(null);
   return(
       <div className="add-task-dialog">
           <input value={tasks}onChange={(event)=>setTasks(event.target.value)}/>
           <div className="add-task-action-container">
               <div className="btns-container">
                   <button
                   disabled={!tasks}
                   className="add-btn"
                   onClick={()=>{
                       onAddTask(tasks,date);
                       onCancel();
                       setTasks("");
                   }}
                   >
                       Add Task
                       </button>
                       <button className="cancel-btn" onClick={()=>{
                           onCancel();
                           setTasks("");
                       }}
                       >
                           cancel
                   </button>
               </div>
               <div className="icon-container">
                   <DayPickerInput
                   onDayChange={(day)=>setDate(day)}
                   placeholder={`${dateFnsFormat(new Date(),FORMAT)}`}
                   formatDate={formatDate}
                   format={FORMAT}
                   dayPickerProps={{
                       modifiers:{
                           disabled:[{before:new Date()}],
                       }
                   }}
                   />
               </div>
           </div>
       </div>
   )

}

const TASK_HEADER_MAPPING={
    INBOX:"Inbox",
    TODAY:"Today",
    NEXT_7:"Next 7 days",
};

const TaskItems=({ selectedTab,tasks})=>{
    let taskToRender =[...tasks];
    if(selectedTab==="Next_7"){
        taskToRender=taskToRender.filter(
            (task)=>
            isAfter(task.date,new Date()) &&
            isBefore(task.date,addDays(new Date(),7))
        );
    }
if (selectedTab==="Today"){
    taskToRender=taskToRender.filter((task)=>isToday(task.date));
}
return(
    <div className="task-items-container">
        {taskToRender.map((task)=>(
            <div className="task-item">
                <p>{task.text}</p>
                <p>{dateFnsFormat(new Date(task.date),FORMAT)}</p>
</div>
        ))}
    </div>
);
};
const Task = ({selectedTab}) =>{
    const[showAddTask,setShowAddTask]=useState(false);
    const[task,setTask]=useState([]);
    
    const AddNewTask=(text,date)=>{
        const newTaskItem={text,date:date ||new Date()};
        setTask((prevState)=>[...prevState,newTaskItem]);
    }
    return (
        <div className="tasks">
             <h1>{TASK_HEADER_MAPPING[selectedTab]}</h1> 
            {selectedTab==="INBOX"?
    <div className="add-task-btn"onClick={()=>setShowAddTask((prevState)=>!prevState)}>
        <span className="plus">+</span>
        <span className="add-task-text">Add Task</span>
        </div> :null}
        {showAddTask && (
            <AddTask
            onAddTask={AddNewTask}
            onCancel={()=>setShowAddTask(false)}
            />
        )}
            {task.length>0?(
                <TaskItems task={task} selectedTab={selectedTab}/>
            ):(
                <p>No task yet</p>
            )}
        
        {/* <div className="add-task-dialog">
            <input />
            <div className="add-task-actions-container">
            <div className="btns-container"></div>
            <div className="icon-container"></div>
            </div>
        </div> */}
        </div>
    );
};


export default Task;