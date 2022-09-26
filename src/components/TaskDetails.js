import { doc,getDoc } from "firebase/firestore"; 
import  db from "../firebase"; 
import { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import Button from './Button';

const TaskDetails = ({onEdit}) => {
    const [loading,setLoading]=useState(true)
    const [task,setTask]=useState({})
    const [error,setError]=useState(null)

    const params=useParams()
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const [text,setText] = useState("");
    const [day,setDay] = useState("");

    useEffect(()=>{
        const fetchData= async ()=>{
            const docRef = doc(db, "tasks", params.id);
            try {
              const docSnap = await getDoc(docRef);
              if(docSnap.exists()) {//if path not exists
                console.log(docSnap.data());
                setTask(docSnap.data());
                setLoading(false); 
              } 
              else{
                navigate("/")
                //redirect(<"/">)
               // const location = useLocation();
                //return <MyPage key={location.key} />
              }

            } catch(error) {
              console.log(error)
          }    

        }; 
        fetchData()   
    },[])
     
//-----------------------------------
const editTask = async(e) => {
    e.preventDefault();

    if(!text || !day)return  alert("Please fill out Text and Day !");
    
    setLoading(true); 
    
    onEdit(day,text,params.id);//call onEdit functions in App.js then reload list
    navigate("/");
  } 
  return loading ? (<h3>Loading...</h3>) :
  ( 
    <div> {!text ? 
      ( //set values here for inputs
        setText(task.text),
        setDay(task.day) )
      : ( 
      <>
        <code>{pathname}</code><br/>
         
        <Button onClick={()=>{navigate("/")}} text='Go Back'/> &nbsp; 
        
        <div>
          <div className="form-control">
            <label>Text</label>
            <input type="text" name="text" value={text} 
            onChange={(e)=>setText(e.target.value) }/>
          </div>
          <div className="form-control">
            <label>Day</label>
            <input type="text" name="day" value={day} 
            onChange={(e)=>setDay(e.target.value) }/>
          </div>
          <button className="btn btn-block"   onClick={ editTask }> Update</button>
        </div> 
      </>)}
    </div>
  )
}

export default TaskDetails