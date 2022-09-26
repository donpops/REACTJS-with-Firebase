import Task from './Task'

const Tasks = ({tasks,onDelete, onToggle}) => {
    
  return (
    <>
    {tasks.map(({id,datas})=>(
        <Task key={datas.id} gid={id} task={datas} onDelete={onDelete} onToggle={onToggle}/>

    ))}
    </>
  )
}

export default Tasks