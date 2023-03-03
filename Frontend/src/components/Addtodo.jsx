import React, {useState} from 'react'
import axios from 'axios'

const Addtodo = ({render}) => {
    const [todo, setTodo] = useState({
        title: "", link:"", note:"", status:false, date: new Date().toISOString().slice(0, 10)
    })

    const Addtodo = async ()=>{
        const msg = await axios.post(`/addtodo`, todo);
        alert(msg.data);
        render();
    }

    const handleChange = (e)=>{
      setTodo({...todo, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        Addtodo();
    }

  return (
    <div className='p-2 mx-[26%]'>
      <div className='flex justify-center font-bold text-cyan-500 mb-4'>Add Todo</div>
      <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-wrap p-6 gap-2 border rounded-md'>
        <label className='flex'><div className='after:content-["*"] after:text-red-500'>Title</div>:
        <input name='title' className='px-1 rounded-md m-1 border-b-2 focus:border-cyan-400 focus:outline-none' onChange={(e)=>{handleChange(e)}} placeholder='Enter Title' required/>
        </label>
        
        <label>Link :
        <input type='url' className='px-1 m-1 rounded-md border-b-2 focus:border-cyan-400 focus:outline-none' name='link' placeholder="https://example.com" pattern="https://.*" onChange={(e)=>{handleChange(e)}}/>
        </label>
        
        <label>Note :
        <input name='note' className='p-1 px-1 rounded-md m-1 border-b-2 focus:border-cyan-400 focus:outline-none' onChange={(e)=>{handleChange(e)}}/>
        </label>
        <div>
        <div>Status Done?</div>
        <input type='radio' id='True' className='mt-4 mx-1' name='radio' onClick={()=>{setTodo({...todo, status: true})}}/><label htmlFor='True'> Yes </label>
        <input type='radio' id='False' name='radio' className='mt-4 mx-1' onClick={()=>{setTodo({...todo, status: false})}}/><label htmlFor='False'> No </label>
        </div>
        
        <label>Due Date :
        <input type='date' name='date' min='2013-02-01' max='2033-02-28' className='m-1 focus:outline-none' onChange={(e)=>{handleChange(e)}}/>
        </label>
        
        <button className='border-2 p-1 rounded-md border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:text-semibold'>Submit</button>
      </form>
      <hr/>
    </div>
  )
}

export default Addtodo
