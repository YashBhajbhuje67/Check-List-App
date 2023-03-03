import React,{useState , useEffect} from 'react';
import Todos from './Todos';
import axios from 'axios';
const Todo = (props) => {
    const [todo, setTodo] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            const msg = await axios.get(`/getalltodo`);
            setTodo(msg.data);
        }
        fetchData()
    },[props.count])
  return (
    <div className='border'>
      {todo.length===0 ? null :
      todo.map((data)=>{
        return (<Todos key={data._id} data={data} render={props.render}/>)
      })}
    </div>
  )
}

export default Todo
