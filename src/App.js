 import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { doc,collection,deleteDoc , addDoc, getDocs, updateDoc } from "firebase/firestore"; 
import  db from "./firebase";
import Tasks from './components/Tasks.js';
import Header from './components/Header.js'; 
import About from './components/About.js';
import Footer from './components/Footer.js';
import AddTask from './components/AddTask.js';
import TaskDetails from './components/TaskDetails.js';

function App() {
  
  const [tasks,setTasks]=useState([]);
  const [showAdd,setShowAdd]=useState(false);

  const [lastId,setLastId]=useState(0);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      const getData= async ()=>{
        //const db= firebase.firestore()
        const gd=await fetchData()
        //const data=await getDocs(collection(db, "tasks"));
        //const tasks = data.map(doc=>doc.data());
        //setTasks(data.docs.map(doc=>doc.data()))

      }
      getData()
      getLastIndex() 
      //console.log(lastId);
  },[])

  const fetchData= async ()=>{
    
    const data=await getDocs(collection(db, "tasks"));
    setTasks(data.docs.map(doc=>({
      id:doc.id,
      datas:doc.data()
    })
      ));
    setLoading(false);
  }
//----functions here
const deleteTask =async (id)=>{
  console.log(id);
  const noteRef = doc(db, "tasks", id);
  await deleteDoc(noteRef);
  fetchData();
}

const togglerReminder = async(id,reminder)=>{
  console.log(id);
  const updateById = doc(db, "tasks", id);
  await updateDoc(updateById, {
    reminder: !reminder

  });

  fetchData();
}
const addTask=async (task)=>{
   
  console.log(lastId);
  await addDoc(collection(db,'tasks'),{
    id:(lastId+1),
    text:task.text,
    day:task.day,
    reminder:task.reminder
  }) 

  updateLastIndex()
  setShowAdd(false);
  fetchData()
  getLastIndex()
  //console.log('LAST : '+lastId);
}

  async function getLastIndex() {
    const data = await getDocs(collection(db, "tasksIndex"));
    const tasks = data.docs.map(doc=>doc.data());

    if(tasks[0].id > 0) setLastId(tasks[0].id);
    console.log("GETLD"+tasks[0].id);
  }

  async function updateLastIndex(){
    const updateById = doc(db, "tasksIndex",'id');
    await updateDoc(updateById, {
      id: (lastId+1) 
    });
  }

  const editTask =async (day,text,id)=>{
    const updateById = doc(db, "tasks", id);
    await updateDoc(updateById, {
      day:day,
      text: text,

    });
    fetchData();
  }
  //----------------------------------------------
  return (
    <Router>
      <div className="container">
      <Header onAdd={()=>setShowAdd(!showAdd)} showAddTask={showAdd}/> 
        <Routes> 
          <Route path="/" exact
              element={
                <> 
                
                {showAdd && <AddTask onAdd={addTask}/> }
                {
                  loading ? (<h3>Loading...</h3>) : (
                  tasks.length>0 ? 
                  <Tasks tasks={tasks} 
                  onToggle={togglerReminder}
                  onDelete={deleteTask}/> :'No Tasks Found' 
                  )
                }
              </>
              }
            />
          <Route path='/about' element={<About/>} />
          <Route path='/task/:id' element={<TaskDetails onEdit={editTask}/>} />
        </Routes>
 
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
