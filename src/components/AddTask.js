import { useState } from "react" 

const AddTask = ({onAdd}) => {
    const [text,setText]=useState('')
    const [day,setDay]=useState('')
    const [reminder,setReminder]=useState(false) 

    function addTask(e) {
        e.preventDefault();

        if(!text){alert('Please input task!'); return}

        onAdd({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)
    }
  return (
    <form className="add-form" onSubmit={addTask}>
        <div className="form-control">
            <label>Task</label>
            <input type="text" name="text" placeholder="Add Task"
            value={text} onChange={(e)=>setText(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input type="text" name="day" placeholder="Day & Time"
            value={day} onChange={(e)=>setDay(e.target.value)}
            />
        </div>
        <div className="form-control form-control-check">
            <label>Reminder</label>
            <input type="checkbox" name="reminder" 
            checked={reminder} value={reminder} 
            onChange={(e)=>setReminder(e.currentTarget.checked)}
            />
        </div>

        <input type="submit" className="btn btn-block" value="Save"/>
    </form>
  )
}

export default AddTask