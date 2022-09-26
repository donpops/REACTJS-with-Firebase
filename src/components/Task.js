 import { FaTimes } from 'react-icons/fa'
 
const Task = ({gid, task,onDelete,onToggle}) => { 

  return (
    <div className={`task ${task.reminder?'reminder':''}`} onDoubleClick={()=>onToggle(gid,task.reminder)}>
        <h3>{task.text} 
            <FaTimes style={{color:'red'}} onClick={ () => onDelete(gid)
              }/>
        </h3>
        <p>{task.day}</p>
        <code>{(task.reminder)}</code>
         
        <button className="btn btn-blue"
          onClick={() => { setDataIdToBeUpdated(gid);   }} >
            Update
          </button>
    </div>
  )
}

export default Task