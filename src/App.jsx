import React, { useEffect, useState } from 'react';
import InputForm from './Components/InputForm';
import Card from './Components/Card';


const App = () => {

  const [todo,setTodo] = useState([]);
  const [completedData,setCompletedData] = useState([]);
  const [completed,setCompleted] = useState('all');
  const [notcompleted,setNotcompleted] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 const [edit,setEdit] = useState(false);
 const [editId,setEditId] = useState();
 const [filt,setFilt] = useState('');

  const addTodo = (title,description) =>{
    if(title.length!==0 && description.length !== 0){
      let task = {
        id:todo.length+1,
        title:title,
        description:description,
        completed:false
      }
      setFilt('')
      setTodo([...todo,task])
    }
   
    
  }

 

  const addTask = (e) =>{ 
    addTodo(title,description);
    setTitle('');
    setDescription('');
    console.log("added")
   
}

  const updateStatus = (id,value) =>{
      const statusData = todo.filter((e)=>id === e.id);
      if(value === "completed"){
        statusData[0].completed = true;
      }else if(value === "notcompleted"){
        statusData[0].completed = false;
      }
      console.log(todo)  
  }

  const deleteTodo = (id) =>{
       setTodo(todo.filter((e)=>e.id !== id))
       setCompletedData(completedData.filter((e)=>e.id !== id))
  }

  const addEdit = (id) =>{
     const data = todo.filter((e)=>e.id === id);
     setEditId(id);
     setTitle(data[0].title);
     setDescription(data[0].description);
  }

  const editTask = () =>{
    const data = todo.filter((e)=>e.id === editId);
    data[0].title=title;
    data[0].description=description;
    setTodo([...todo]);
    setTitle("");
    setDescription("");
    setEdit(false);
  }



const filterData = (value) =>{
    setFilt(value)
  if(value === "all"){
    setCompletedData([...todo])
   } else if(value === "completed"){
      setCompletedData(todo.filter((e)=>e.completed === true))
     }else if(value === "notcompleted"){
      setCompletedData(todo.filter((e)=>e.completed === false))
     }
}


  return (
    <div className='p-4'>
      <h1 className='text-center text-success'>My Todo</h1>
       <InputForm addTodo={addTodo} addTask={addTask} title={title} setTitle={setTitle} 
       description={description} setDescription={setDescription} edit={edit} editTask={editTask}/>
       <div className='w-100 d-flex justify-content-between'>
        <h3>My Todos</h3>
        <div className='d-flex align-items-center'>
          <h3 className='mb-0'>Status:&nbsp;</h3> 
        <select  onChange={(e)=>filterData(e.target.value)} className='filter text-center h-100 text-light border-0'>
          <option value='all' >All</option>
          <option value='completed'>Completed</option>
          <option value='notcompleted'>Not Completed</option>
        </select>
        </div>
       </div>
       <div className='row '>
      {filt===''?todo.map((element,index)=>{
              return(<Card key={index}  element={element} index={element.id} updateStatus={updateStatus} deleteTodo={deleteTodo} setEdit={setEdit} addEdit={addEdit}/>)
       }):completedData.map((element,index)=>{
        return(<Card key={index}  element={element} index={element.id} updateStatus={updateStatus} deleteTodo={deleteTodo} setEdit={setEdit} addEdit={addEdit}/>)
 })}
      {/* {completedData.map((element,index)=>{
              return(<Card key={index}  element={element} index={element.id} updateStatus={updateStatus} deleteTodo={deleteTodo} setEdit={setEdit} addEdit={addEdit}/>)
       })} */}
     
       </div>
      
      
    </div>
  );
};

export default App;